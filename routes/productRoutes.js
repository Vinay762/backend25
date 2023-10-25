import express from 'express';
import { getAllProducts, addProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/', getAllProducts);
router.post('/addProduct', addProduct);
router.delete('/delete', deleteProduct);

export default router;