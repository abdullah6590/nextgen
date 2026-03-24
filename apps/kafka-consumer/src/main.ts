import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ecommerce-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'ecommerce-consumer-group' });

async function bootstrap() {
  await consumer.connect();
  console.log('Kafka Consumer connected to broker');

  await consumer.subscribe({ topic: 'product-views', fromBeginning: true });
  console.log('Subscribed to topic: product-views');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message on topic ${topic}:`, {
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      // Placeholder for forwarding data to recommendation engine or other pipelines
    },
  });
}

bootstrap().catch((err) => {
  console.error('Error starting Kafka consumer:', err);
  process.exit(1);
});
