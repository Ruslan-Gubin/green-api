import amqp from 'amqplib';
import { logger } from '../utils/loger.js';
import { productService } from './product-service.js';

export class RabbitAmqpService {
  private queueName = 'green-api';
  private urlAmqp = 'amqp://localhost';

  async processTask(task: { action: string; body: any }) {
    let result = null;

    switch (task.action) {
      case 'getAllProducts':
        const products = await productService.getProducts();
        if (typeof products === 'string') throw new Error('Error get all products');
        result = products;
        break;
      case 'createProduct':
        const newProduct = await productService.createProduct(task.body);
        if (typeof newProduct === 'string') throw new Error('Error create product');
        result = newProduct;
        break;
    }

    return result;
  }

  async startConsumer() {
    try {
      const connection = await amqp.connect(this.urlAmqp);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.queueName, { durable: true });
      await channel.prefetch(1);

      logger.info('Microservice M2 is waiting for tasks...');

      /** Получение задания из очереди */
      channel.consume(this.queueName, async (message) => {
        if (!message) {
          throw new Error('Failed to message in consumer');
        }

        const task = JSON.parse(message.content.toString());

        const result = await this.processTask(task);
        logger.info('Microservice M2 completed task');

        /** Помещение результата обработки задания в очередь */
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(result)), {
          correlationId: message.properties.correlationId,
        });

        /** Подтверждение обработки задания */
        channel.ack(message);
      });
    } catch (error) {
      logger.error('Error:', error);
    }
  }
}
