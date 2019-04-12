import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, adminAuth } from '../middlewares/authentication';


const userRouter = new Router();
const { createUser, signin, createStaffAdmin } = userController;

userRouter.post('/auth/signup', createUser);
userRouter.post('/auth/signin', signin);
userRouter.post('/staff', requireAuth, adminAuth, createStaffAdmin);

export default userRouter;
