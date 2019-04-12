import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, adminAuth } from '../middlewares/authentication';


const userRouter = new Router();
const { createUser, signin, createStaff } = userController;

userRouter.post('/auth/signup', createUser);
userRouter.post('/auth/signin', signin);
userRouter.post('/staff', requireAuth, adminAuth, createStaff);

export default userRouter;
