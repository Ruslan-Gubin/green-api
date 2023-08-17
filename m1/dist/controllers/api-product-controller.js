import { rabbitAmqpService } from '../services/index.js';
import { logger } from '../utils/index.js';
export class ProductController {
    constructor() {
        this.queueName = 'green-api';
        this.createProduct = async (req, res) => {
            try {
                const { name, price } = req.body;
                const task = {
                    action: 'createProduct',
                    body: { name, price }
                };
                const newProduct = await rabbitAmqpService.createTask(this.queueName, task);
                logger.info('Get result in rabbitMQ');
                res.status(201).json(newProduct);
            }
            catch (error) {
                logger.error('Failed to get dice:', error);
                res.status(500).json({ error: 'Failed to create product', errorMessage: error });
            }
        };
        this.getProducts = async (req, res) => {
            try {
                const task = {
                    action: 'getAllProducts',
                };
                const products = await rabbitAmqpService.createTask(this.queueName, task);
                logger.info('Get result in rabbitMQ');
                res.status(201).json(products);
            }
            catch (error) {
                logger.error('Failed to get dice:', error);
                res.status(500).json({ error: 'Failed to get Products', errorMessage: error });
            }
        };
    }
}
