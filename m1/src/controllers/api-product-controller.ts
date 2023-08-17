import { Response } from 'express-serve-static-core';
import { rabbitAmqpService } from '../services/index.js';
import { IRequestParams, IRequestBody, ProductModel } from '../types/index.js';

import { logger } from '../utils/index.js';

export class ProductController {
  private queueName = 'green-api';
  constructor() {}

  /** Создание нового товара */
  createProduct = async (req: IRequestBody<{ name: string, price: number }>, res: Response<ProductModel | {error: string, errorMessage: unknown}>) => {
    try {
      const { name, price } = req.body

      const task = {
        action: 'createProduct',
        body: { name, price }
      }

      const newProduct = await rabbitAmqpService.createTask(this.queueName, task) as ProductModel
      logger.info('Get result in rabbitMQ')
      res.status(201).json(newProduct);
    } catch (error) {
      logger.error('Failed to get dice:', error);
      res.status(500).json({ error: 'Failed to create product', errorMessage: error });
    }
  };

  /** Получение всех товаров */
  getProducts = async (req: IRequestParams<{}>, res: Response<ProductModel[] | {error: string, errorMessage: unknown}>) => {
    try {

      const task = {
        action: 'getAllProducts',
      }

    const products = await rabbitAmqpService.createTask(this.queueName, task) as ProductModel[]
    logger.info('Get result in rabbitMQ')
      res.status(201).json(products);
    } catch (error) {
      logger.error('Failed to get dice:', error);
      res.status(500).json({ error: 'Failed to get Products', errorMessage: error });
    }
  };
 
}