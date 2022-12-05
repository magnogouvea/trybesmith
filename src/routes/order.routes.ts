import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authToken from '../middlewares/auth.token';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', authToken, orderController.create);

export default router;