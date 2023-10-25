import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);



app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log(`Server is running on port :- ${PORT}`);
})
