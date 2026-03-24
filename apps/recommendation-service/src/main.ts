import { Kafka } from 'kafkajs';
import { PrismaClient } from './generated/client';

const kafka = new Kafka({
    clientId: 'recommendation-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'recommendation-group' });
const prisma = new PrismaClient();

async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'product-views', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                if (message.value === null) {
                    console.log('Skipping message with null value');
                    return;
                }
                const viewData = JSON.parse(message.value.toString());
                console.log(`Processing product view: ${JSON.stringify(viewData)}`);

                // Store the view event
                await prisma.productView.create({
                    data: {
                        userId: viewData.userId,
                        productId: viewData.productId,
                        timestamp: new Date(viewData.timestamp)
                    }
                });

                console.log(`Stored product view for user ${viewData.userId}`);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        },
    });
}

async function main() {
    try {
        await runConsumer();
        console.log('Kafka consumer is running');
    } catch (error) {
        console.error('Error in recommendation service:', error);
        process.exit(1);
    }
}

main();