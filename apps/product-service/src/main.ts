import express from 'express';
import * as path from 'path';
import mongoose, { Schema, Document } from 'mongoose';
import { Kafka } from 'kafkajs';
import { authMiddleware, roleMiddleware, ROLES, AuthenticatedRequest, validate, createProductSchema } from '@nextgen/shared';

const app = express();
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop_products';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  vendorId: string;
  images: string[];
  tags: string[];
  featureVector?: number[];
  createdAt: Date;
  isDeleted: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  vendorId: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  featureVector: { type: [Number], select: false },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

// Text index for search
ProductSchema.index({ name: 'text', category: 'text', tags: 'text' });

const Product = mongoose.model<IProduct>('Product', ProductSchema);

// Kafka Producer
const kafka = new Kafka({
  clientId: 'product-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
const producer = kafka.producer();
let kafkaReady = false;

const runProducer = async () => {
  await producer.connect();
  kafkaReady = true;
  console.log('Kafka Producer connected');
};
runProducer().catch(err => {
  console.error('Kafka Producer failed to connect:', err.message);
});

// Internal service-to-service auth guard
const INTERNAL_SECRET = process.env.INTERNAL_SECRET || 'internal-service-key-change-in-prod';
function internalAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.headers['x-internal-secret'] !== INTERNAL_SECRET) {
    return res.status(403).json({ error: 'Forbidden: internal endpoint' });
  }
  next();
}

// =============================================
// PUBLIC ENDPOINTS (no auth required)
// =============================================

// Get Products (Pagination + Search)
app.get('/', async (req, res) => {
  const { page = 1, limit = 10, search, category } = req.query;
  const query: any = {};

  if (search) {
    query.$text = { $search: search as string };
  }
  if (category) {
    query.category = category;
  }
  
  query.isDeleted = false;

  try {
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// =============================================
// PROTECTED ENDPOINTS (auth required)
// =============================================

// Create Product (vendor/admin only)
app.post('/',
  authMiddleware as any,
  roleMiddleware([ROLES.VENDOR, ROLES.ADMIN]),
  validate(createProductSchema) as any,
  async (req: AuthenticatedRequest, res) => {
    try {
      // Add vendorId from authenticated user
      const productData = {
        ...req.body,
        vendorId: req.user!.userId.toString()
      };

      const product = new Product(productData);
      await product.save();

      // Emit product creation event (fire-and-forget)
      if (kafkaReady) {
        producer.send({
          topic: 'product-created',
          messages: [{
            value: JSON.stringify({
              productId: product._id,
              vendorId: product.vendorId,
              name: product.name,
              price: product.price,
              category: product.category
            })
          }]
        }).catch(err => console.error('Kafka send failed (product-created):', err.message));
      }

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create product' });
    }
  }
);

// =============================================
// VENDOR ENDPOINTS (protected by vendor role)
// IMPORTANT: Must be registered BEFORE /:id to avoid route shadowing
// =============================================

// Get vendor's products
app.get('/vendor',
  authMiddleware as any,
  roleMiddleware([ROLES.VENDOR, ROLES.ADMIN]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const products = await Product.find({ vendorId: req.user!.userId.toString(), isDeleted: false });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vendor products' });
    }
  }
);

// Update vendor's product
app.patch('/vendor/:id',
  authMiddleware as any,
  roleMiddleware([ROLES.VENDOR, ROLES.ADMIN]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, vendorId: req.user!.userId.toString() },
        req.body,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ error: 'Product not found or not owned by vendor' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
);

// Delete vendor's product (soft-delete)
app.delete('/vendor/:id',
  authMiddleware as any,
  roleMiddleware([ROLES.VENDOR, ROLES.ADMIN]),
  async (req: AuthenticatedRequest, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, vendorId: req.user!.userId.toString(), isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ error: 'Product not found or not owned by vendor' });
      }

      // Emit product-deleted event so recommendation-service and others can scrub references
      if (kafkaReady) {
        producer.send({
          topic: 'product-deleted',
          messages: [{
            value: JSON.stringify({
              productId: product._id,
              vendorId: product.vendorId
            })
          }]
        }).catch(err => console.error('Kafka send failed (product-deleted):', err.message));
      }

      res.json({ message: 'Product successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
);

// =============================================
// INTERNAL SERVICE-TO-SERVICE ENDPOINTS
// Guarded by X-Internal-Secret header — NOT accessible from frontend
// =============================================

// Get stock info for a product
app.get('/internal/:id/stock', internalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('name price stock');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      productId: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
});

// Decrement stock for a product (ATOMIC — race-condition safe)
app.patch('/internal/:id/decrement', internalAuth, async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  try {
    // Atomic: check stock >= quantity AND decrement in a single operation.
    // MongoDB locks the document during findOneAndUpdate, preventing
    // two concurrent requests from both passing the stock check.
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    );

    if (!product) {
      // Either product doesn't exist or stock was insufficient.
      // Check which case it was so we can return a helpful error.
      const exists = await Product.findById(req.params.id).select('stock name');
      if (!exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(400).json({
        error: 'Insufficient stock',
        available: exists.stock,
        requested: quantity
      });
    }

    res.json({
      productId: product._id,
      name: product.name,
      stock: product.stock
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrement stock' });
  }
});

// Rollback stock (used when partial order fails)
app.patch('/internal/:id/rollback', internalAuth, async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { stock: quantity } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      productId: product._id,
      name: product.name,
      stock: product.stock
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to rollback stock' });
  }
});

// =============================================
// CATCH-ALL: Get Single Product
// MUST be LAST — /:id matches any string
// =============================================
app.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Publish to Kafka (fire-and-forget — never block the response)
    if (req.query.userId && kafkaReady) {
      const payload = {
        userId: req.query.userId,
        productId: product._id,
        timestamp: new Date().toISOString(),
      };
      producer.send({
        topic: 'product-views',
        messages: [{ value: JSON.stringify(payload) }],
      }).catch(err => console.error('Kafka send failed (product-views):', err.message));
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
