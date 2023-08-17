import amqp from 'amqplib';
import { logger } from '../utils/loger.js';
class RabbitAmqpService {
    constructor() {
        this.urlAmqp = 'amqp://localhost';
    }
    async createTask(queueName, task) {
        try {
            const connection = await amqp.connect(this.urlAmqp);
            const channel = await connection.createChannel();
            const resultQueue = await this.createRandomQueue(channel);
            const resultPromise = new Promise((resolve) => {
                channel.consume(resultQueue.queue, async (message) => {
                    if (!message)
                        throw new Error('Failed to receive message');
                    const result = JSON.parse(message.content.toString());
                    this.closeChanel(channel, connection);
                    resolve(result);
                }, { noAck: true });
            });
            this.addTaskQueue(queueName, channel, task, resultQueue);
            return resultPromise;
        }
        catch (error) {
            logger.error('Failed to  create task message', error);
        }
    }
    async addTaskQueue(queueName, channel, task, resultQueue) {
        await channel.assertQueue(queueName, { durable: true });
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(task)), {
            persistent: true,
            replyTo: resultQueue.queue,
        });
        logger.info('Create task in queue');
    }
    async createRandomQueue(channel) {
        return await channel.assertQueue('', { exclusive: true });
    }
    async closeChanel(channel, connection) {
        channel.close();
        connection.close();
    }
}
export const rabbitAmqpService = new RabbitAmqpService();
