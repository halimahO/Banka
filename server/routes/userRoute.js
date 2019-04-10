import { Router } from 'express';
import userController from '../controllers/userController';
import {requireAuth, adminAuth} from '../middlewares/authentication';


const userRouter = new Router();
const {createUser, signin } = userController;

userRouter.post('/auth/signup', createUser);
userRouter.post('/auth/signin', signin);

export default userRouter;
