import * as express from 'express';
import { ProductController } from '../controllers/index.js';
const router = express.Router();
const productController = new ProductController();
router.get("/api/get-products", productController.getProducts);
router.post("/api/create-product", productController.createProduct);
export const productRouter = router;
