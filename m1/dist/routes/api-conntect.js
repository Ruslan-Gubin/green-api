import * as express from 'express';
import { ProductController } from '../controllers/index.js';
import { ProductService } from '../services/index.js';
const router = express.Router();
const productService = new ProductService();
const productController = new ProductController(productService);
router.get("/api/get-products", productController.getProducts);
router.post("/api/create-product", productController.createProduct);
export const productRouter = router;
