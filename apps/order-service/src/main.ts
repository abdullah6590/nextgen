import express from 'express';
import * as path from 'path';
import axios from 'axios';
import { PrismaClient } from './generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { authMiddleware, roleMiddleware, ROLES, AuthenticatedRequest } from '../../../libs/shared/authMiddleware';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter: adapter as any } as any);

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// =============================================
// ALL ORDER ROUTES ARE PROTECTED (auth required)
// =============================================

// POST /orders - Create Order
app.post('/', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  const { items } = req.body;
  const userId = req.user!.userId.toString();

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    // 1. Validate stock for ALL items via Product Service
    const stockChecks = await Promise.all(
      items.map(async (item: any) => {
        try {
          const { data } = await axios.get(
            `${PRODUCT_SERVICE_URL}/internal/${item.productId}/stock`
          );
          return {
            productId: item.productId,
            requestedQty: item.quantity,
            availableStock: data.stock,
            name: data.name,
            sufficient: data.stock >= item.quantity,
          };
        } catch (error: any) {
          return {
            productId: item.productId,
            requestedQty: item.quantity,
            availableStock: 0,
            name: 'Unknown',
            sufficient: false,
            error: error.response?.data?.error || 'Product not found',
          };
        }
      })
    );

    // Check if any item has insufficient stock
    const outOfStock = stockChecks.filter((check) => !check.sufficient);
    if (outOfStock.length > 0) {
      return res.status(400).json({
        error: 'Insufficient stock for one or more items',
        details: outOfStock.map((item) => ({
          productId: item.productId,
          name: item.name,
          requested: item.requestedQty,
          available: item.availableStock,
          ...(item.error ? { reason: item.error } : {}),
        })),
      });
    }

    // 2. Decrement stock for ALL items via Product Service
    await Promise.all(
      items.map(async (item: any) => {
        await axios.patch(
          `${PRODUCT_SERVICE_URL}/internal/${item.productId}/decrement`,
          { quantity: item.quantity }
        );
      })
    );

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

// Emit order-created event to Kafka
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
}

connectProducer().catch(console.error);

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
