import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validationsProduct from '../middlewares/validationsProduct';

const router = Router();
const productController = new ProductController();

router.post(
  '/', 
  validationsProduct.productAmountValidation,
  validationsProduct.productNameValidation,
  productController.create,
);
router.get('/', productController.getAll);

export default router;