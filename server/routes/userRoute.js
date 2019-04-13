import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, adminAuth } from '../middlewares/authentication';
import userValidate from '../middlewares/validateUser';


const userRouter = new Router();
const { createUser, signin, createStaff } = userController;

userRouter.post('/auth/signup', createUser);
userRouter.post('/auth/signin', userValidate.login, signin);
userRouter.post('/staff', requireAuth, adminAuth, createStaff);

export default userRouter;
