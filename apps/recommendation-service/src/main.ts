import { Kafka } from 'kafkajs';
import { PrismaClient } from './generated/client';
import express from 'express';

const kafka = new Kafka({
    clientId: 'recommendation-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'recommendation-group' });
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3005;

// Dummy recommendations fallback
const DUMMY_RECOMMENDATIONS = [
  { id: 'rec-1', name: 'Cybernetic Enhancer Pro', price: 249.99, category: 'Hardware', matchScore: 0.98, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM' },
  { id: 'rec-2', name: 'Neural Link Hub', price: 129.50, category: 'Accessories', matchScore: 0.92, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0kL0OVc4DTI5hZ1_sYW3t4MxQrpudSwaD79qPf8w16b0gibEsdps4OaLyZEFW2eG5PjkjOjjAU8hKCvhFPo9lC77gQzEg0jOeKEFUuR3oUe7NASDiKZgRhcVU5q1TH2tgcbVU1kf_CayrCWEwEWxaXLOVpchGKMGhnC5kiiubSfvqi6GpMlHymLu9ufHq1FJVW5ewSBGsqoANc7DTaaLEx_eoyQCqDc1Kan0i87b9bc0lNfn6mrgBymgvaQzcRw62UqS_PgEjr5Zm' },
  { id: 'rec-3', name: 'Quantum Encryption Drive', price: 89.99, category: 'Storage', matchScore: 0.85, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYg3MLCZzaEhLC9vGyi-A0jJah_1MXja3CP6WOebzBr6lOMg-uq4z0GoYPP3_YhPFYSENh4uadYTV9oIpwJrW2uAGF_2hNNnVCfKF1dXQPlIJF2y0jMibn8wCqFLJAaiDj_Wp_5yi24LneCWyzVR3XM3vV31B8YHfKEBcr9scJ5dd98OzbfZt0WyobW_1y2-hub2jCEwxuNRMHnA-K0WyKULBJa362JWVmcmYFSE0QhEQxpQWClxEMv6lSL7h8vDYOhj6TGGIDu0l' }
];

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const userId = req.query.userId as string;

        // If no user context, return featured dummy recommendations
        if (!userId) {
            return res.json({
                message: 'No user context provided. Returning featured dummy recommendations.',
                recommendations: DUMMY_RECOMMENDATIONS
            });
        }

        // Check if we have any views or purchases for this user
        const userViews = await prisma.productView.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            take: 10
        });

        const userPurchases = await prisma.productPurchase.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            take: 5
        });

        // If they don't have enough history, return the high-quality dummy data
        if (userViews.length < 3 && userPurchases.length === 0) {
            return res.json({
                message: 'Insufficient user history. Returning featured dummy recommendations.',
                recommendations: DUMMY_RECOMMENDATIONS
            });
        }

        // Purchases carry much higher weight than views in our "algorithm"
        const purchasedIds = userPurchases.map(p => p.productId);
        const viewedIds = userViews.map(v => v.productId);
        
        // Combine, prioritizing purchases, then views, deduplicated
        const combinedIds = [...new Set([...purchasedIds, ...viewedIds])];

        const personalizedRecs = combinedIds.slice(0, 2).map((pid, idx) => ({
            id: pid,
            name: `Personalized Asset ${pid.substring(0,6)}`,
            price: 199.99,
            category: 'Personalized',
            matchScore: 0.99 - (idx * 0.05),
            image: DUMMY_RECOMMENDATIONS[idx % DUMMY_RECOMMENDATIONS.length].image // reuse images so it looks good
        }));

        const finalRecs = [...personalizedRecs, ...DUMMY_RECOMMENDATIONS].slice(0, 4);

        res.json({
            message: 'Personalized recommendations generated.',
            recommendations: finalRecs
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to generate recommendations' });
    }
});

async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'product-views', fromBeginning: true });
    await consumer.subscribe({ topic: 'product-deleted', fromBeginning: true });
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                if (message.value === null) {
                    console.log('Skipping message with null value');
                    return;
                }
                const eventData = JSON.parse(message.value.toString());

                if (topic === 'order-created') {
                    console.log(`Processing order created: ${JSON.stringify(eventData)}`);
                    
                    // order-created event contains an array of items
                    const purchases = eventData.items.map((item: any) => ({
                        userId: eventData.userId,
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        timestamp: new Date()
                    }));

                    if (purchases.length > 0) {
                        await prisma.productPurchase.createMany({
                            data: purchases
                        });
                        console.log(`Stored ${purchases.length} product purchases for user ${eventData.userId}`);
                    }
                    return;
                }

                if (topic === 'product-deleted') {
                    console.log(`Processing product deletion cascade: ${JSON.stringify(eventData)}`);
                    await prisma.productView.deleteMany({
                        where: { productId: eventData.productId }
                    });
                    console.log(`Scrubbed product views for deleted product ${eventData.productId}`);
                    return;
                }

                if (topic === 'product-views') {
                    console.log(`Processing product view: ${JSON.stringify(eventData)}`);
                    // Store the view event
                    await prisma.productView.create({
                        data: {
                            userId: eventData.userId,
                            productId: eventData.productId,
                            timestamp: new Date(eventData.timestamp)
                        }
                    });
                    console.log(`Stored product view for user ${eventData.userId}`);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        },
    });
}

async function main() {
    try {
        // Start express server
        app.listen(PORT, () => {
            console.log(`Recommendation API listening at http://localhost:${PORT}`);
        });

        // Start background consumer
        await runConsumer();
        console.log('Kafka consumer is running');
    } catch (error) {
        console.error('Error in recommendation service:', error);
        process.exit(1);
    }
}

main();