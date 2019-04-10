import { Router } from 'express';
import accountController from '../controllers/accountController';


const accountRouter = new Router();
const { createAccount } = accountController;

accountRouter.post('/:userId/accounts', createAccount);

export default accountRouter;
