import express from 'express';
import * as path from 'path';
import mongoose, { Schema, Document } from 'mongoose';
import { Kafka } from 'kafkajs';
import { authMiddleware, AuthenticatedRequest } from '../../../libs/shared/authMiddleware';

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
  createdAt: Date;
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
  createdAt: { type: Date, default: Date.now },
});

// Text index for search
ProductSchema.index({ name: 'text', category: 'text', tags: 'text' });

const Product = mongoose.model<IProduct>('Product', ProductSchema);

// Kafka Producer
const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};
runProducer().catch(console.error);

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
    res.status(500).json({ error: error.message });
  }
});

// Get Single Product
app.get('/:id', async (req, res) => {
  // Skip if this is an internal route (handled below)
  if (req.params.id === 'internal') return;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Publish to Kafka (Fire & Forget)
    if (req.query.userId) {
        const payload = {
            userId: req.query.userId,
            productId: product._id,
            timestamp: new Date().toISOString(),
        };
        await producer.send({
            topic: 'product-views',
            messages: [{ value: JSON.stringify(payload) }],
        });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// PROTECTED ENDPOINTS (auth required)
// =============================================

// Create Product (authenticated users only)
app.post('/', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// =============================================
// INTERNAL SERVICE-TO-SERVICE ENDPOINTS
// These are called by order-service, not by the frontend
// =============================================

// Get stock info for a product
app.get('/internal/:id/stock', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Decrement stock for a product
app.patch('/internal/:id/decrement', async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        error: 'Insufficient stock', 
        available: product.stock, 
        requested: quantity 
      });
    }

    product.stock -= quantity;
    await product.save();

    res.json({ 
      productId: product._id,
      name: product.name,
      stock: product.stock 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
