import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationsUser from '../middlewares/validationsUser';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  validationsUser.classeValidation,
  validationsUser.levelValidation,
  validationsUser.passwordValidation,
  validationsUser.usernameValidation,
  userController.create,
);

export default router;