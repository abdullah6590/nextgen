import express from 'express';
import * as path from 'path';
import axios from 'axios';
import { Kafka } from 'kafkajs';
import { PrismaClient } from './generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { authMiddleware, roleMiddleware, ROLES, AuthenticatedRequest, validate, createOrderSchema } from '@nextgen/shared';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter: adapter as any } as any);

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
const INTERNAL_SECRET = process.env.INTERNAL_SECRET || 'internal-service-key-change-in-prod';

// Kafka Producer
const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
const producer = kafka.producer();
producer.connect()
  .then(() => console.log('Order Service Kafka Producer connected'))
  .catch(err => console.error('Kafka Producer failed:', err.message));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// =============================================
// ALL ORDER ROUTES ARE PROTECTED (auth required)
// =============================================

// POST /orders - Create Order
app.post('/', authMiddleware as any, validate(createOrderSchema) as any, async (req: AuthenticatedRequest, res) => {
  const { items } = req.body;
  const userId = req.user!.userId.toString();

  try {
    // Atomic stock decrement — each call checks stock >= quantity AND decrements
    // in a single MongoDB operation. No TOCTOU race condition possible.
    const decremented: { productId: string; quantity: number }[] = [];

    for (const item of items) {
      try {
        const { data } = await axios.patch(
          `${PRODUCT_SERVICE_URL}/internal/${item.productId}/decrement`,
          { quantity: item.quantity },
          { headers: { 'x-internal-secret': INTERNAL_SECRET } }
        );
        decremented.push({ productId: item.productId, quantity: item.quantity });
      } catch (error: any) {
        // This item failed — rollback all previously decremented items
        await Promise.all(
          decremented.map(async (d) => {
            try {
              await axios.patch(
                `${PRODUCT_SERVICE_URL}/internal/${d.productId}/rollback`,
                { quantity: d.quantity },
                { headers: { 'x-internal-secret': INTERNAL_SECRET } }
              );
            } catch (rollbackErr) {
              console.error(`CRITICAL: Failed to rollback stock for ${d.productId}:`, rollbackErr);
            }
          })
        );

        const errData = error.response?.data;
        return res.status(400).json({
          error: 'Insufficient stock',
          details: [{
            productId: item.productId,
            requested: item.quantity,
            available: errData?.available ?? 0,
            reason: errData?.error || 'Stock check failed',
          }],
        });
      }
    }

    // 3. Calculate Total
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // 4. Create Order in Database
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'pending',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Emit order-created event
    producer.send({
      topic: 'order-created',
      messages: [
        {
          value: JSON.stringify({
            orderId: order.id,
            userId: order.userId,
            totalAmount: order.totalAmount,
            items: order.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          })
        }
      ]
    }).catch(err => console.error('Failed to emit order-created event', err));

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});



// GET /orders/my-orders - Get authenticated user's orders
app.get('/my-orders', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user!.userId.toString(),
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /vendor/orders - Get orders for vendor's products
app.get('/vendor/orders', authMiddleware as any, roleMiddleware([ROLES.VENDOR, ROLES.ADMIN]), async (req: AuthenticatedRequest, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Get vendor's products from Product Service
    const { data: vendorProducts } = await axios.get(`${PRODUCT_SERVICE_URL}/vendor`, {
      headers: { Authorization: token }
    });
    
    const vendorProductIds = vendorProducts.map((p: any) => p._id.toString());
    
    if (vendorProductIds.length === 0) {
      return res.json([]);
    }

    // Find orders containing any of these products
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            productId: {
              in: vendorProductIds
            }
          }
        }
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch vendor orders:', error);
    res.status(500).json({ error: 'Failed to fetch vendor orders' });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to order-service!' });
});

const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
