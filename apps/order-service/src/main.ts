import express from 'express';
import * as path from 'path';
import { PrismaClient } from './generated/client/client';

const app = express();
// @ts-ignore
const prisma = new PrismaClient({});

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// POST /orders - Create Order
app.post('/', async (req, res) => {
  const { userId, items } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    // 1. Mock Stock Validation
    // In real app, we would query Product Service here or check local replica
    const stockAvailable = true;
    if (!stockAvailable) {
      return res.status(400).json({ error: 'Out of stock' });
    }

    // 2. Calculate Total
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // 3. Create Order Transaction
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'pending',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /orders/my-orders
app.get('/my-orders', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId as string
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
