import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, staffAuth, adminAuth } from '../middlewares/authentication';
import userValidate from '../middlewares/validateUser';
import paramsValidate from '../middlewares/validateParams';


const userRouter = new Router();
const {
  signUp, signin, allUserAccounts,
  createStaff, createAdmin, resetPassword,
} = userController;

userRouter.post('/auth/signup',
  userValidate.client,
  signUp);

userRouter.post('/auth/signin',
  userValidate.login,
  signin);

userRouter.post('/staff',
  requireAuth, adminAuth,
  userValidate.login,
  createStaff);

userRouter.post('/admin',
  userValidate.login,
  createAdmin);

userRouter.get('/user/:email/accounts',
  requireAuth, staffAuth,
  paramsValidate.email,
  allUserAccounts);

userRouter.post('/user/:email/resetpassword',
  requireAuth,
  paramsValidate.email,
  userValidate.resetPassword,
  resetPassword);

export default userRouter;
