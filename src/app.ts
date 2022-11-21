import express from 'express';
import productRoute from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';

const app = express();
app.use(express.json());

app.use('/products', productRoute);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

export default app;
