import { logger } from '../utils/index.js';
const mockProducts = [
    {
        "name": "Product 1",
        "price": 10.99,
        "id": "product-1"
    },
    {
        "name": "Product 2",
        "price": 19.99,
        "id": "product-2"
    },
    {
        "name": "Product 3",
        "price": 7.5,
        "id": "product-3"
    }
];
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
            const result = mockProducts;
            return result;
        }
        catch (error) {
            logger.error('Failed to connect service:', error);
            return 'Failed to connect service';
        }
    }
}
