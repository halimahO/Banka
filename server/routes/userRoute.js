import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, adminAuth } from '../middlewares/authentication';
import userValidate from '../middlewares/validateUser';


const userRouter = new Router();
const { signUp, signin, createStaff } = userController;

userRouter.post('/auth/signup',
  userValidate.client,
  signUp);

userRouter.post('/auth/signin',
  userValidate.login,
  signin);

userRouter.post('/staff',
  requireAuth, adminAuth,
  userValidate.staff,
  createStaff);

userRouter.post('/admin',
  userValidate.staff,
  createStaff);

export default userRouter;
