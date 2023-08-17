import { ProductModel } from '../types/index.js';
import { logger } from '../utils/index.js';
import { mockProducts } from '../utils/mockProduct.js';


class ProductService {
  private products: ProductModel[] = mockProducts
  constructor() {}


 public async createProduct(body: { name: string, price: number }): Promise<ProductModel | string>  {
    try {
      const { name, price } = body

      const newProduct = {
        id: (this.products.length + 1).toString(),
        name,
        price,
      }

      this.products.push(newProduct)

      return newProduct
    } catch (error) {
      logger.error('Failed to create product:', error);
      return  'Failed to create product';
    }
  }

 public async getProducts(): Promise<ProductModel[] | string>  {
    try {
      return this.products
    } catch (error) {
      logger.error('Failed to get products:', error);
      return  'Failed to get products';
    }
  }

}

export const productService = new ProductService()