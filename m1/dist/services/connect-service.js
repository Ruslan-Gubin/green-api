import { logger } from '../utils/index.js';
export class ProductService {
    constructor() { }
    async createProduct() {
        try {
            console.log('Create Product');
            return { success: true };
        }
        catch (error) {
            logger.error('Failed to connect service:', error);
            return 'Failed to connect service';
        }
    }
    async getProducts() {
        try {
            console.log('get all products');
            const result = [];
            return result;
        }
        catch (error) {
            logger.error('Failed to connect service:', error);
            return 'Failed to connect service';
        }
    }
}
