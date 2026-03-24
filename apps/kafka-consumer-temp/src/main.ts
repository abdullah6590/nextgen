import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaConsumerModule } from './kafka-consumer.module';

async function bootstrap() {
    const app = await NestFactory.create(KafkaConsumerModule);

    // Connect to Kafka
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            },
            consumer: {
                groupId: 'ecommerce-consumer',
            }
        }
    });

    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();