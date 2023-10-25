import express from 'express';
import { deleteOrder, removeOrderByProductId, createOrder } from '../controllers/orderController.js';
const router = express.Router();


//create the order
router.post('/createOrder', createOrder);
router.post('/removeproductfromOrder', removeOrderByProductId);
router.delete('/deleteOrder', deleteOrder);

export default router;