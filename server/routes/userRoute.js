import { Router } from 'express';
import userController from '../controllers/userController';


const userRouter = new Router();
const {createUser } = userController;

userRouter.post('/auth/signup', createUser);

export default userRouter;
