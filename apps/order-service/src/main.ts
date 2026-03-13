import express from 'express';
import * as path from 'path';
import axios from 'axios';
import { PrismaClient } from './generated/client/client';
import { authMiddleware, AuthenticatedRequest } from '../../../libs/shared/authMiddleware';

const app = express();
// @ts-ignore
const prisma = new PrismaClient({});

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

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to order-service!' });
});

const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
