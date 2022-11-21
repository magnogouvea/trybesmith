import express from 'express';
import productRoute from './routes/product.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());

app.use('/products', productRoute);
app.use('/users', userRoutes);

export default app;
