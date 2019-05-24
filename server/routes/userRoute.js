import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, staffAuth, adminAuth } from '../middlewares/authentication';
import userValidate from '../middlewares/validateUser';
import paramsValidate from '../middlewares/validateParams';
import upload from '../helpers/uploadFile';


const userRouter = new Router();
const {
  signUp, signin, allUserAccounts,
  createStaff, createAdmin, uploadPicture,
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

userRouter.post('/uploadpicture',
  requireAuth,
  upload.single('avatar'),
  uploadPicture);

export default userRouter;
