import { Router } from 'express';
import accountController from '../controllers/accountController';
import { requireAuth, staffAuth } from '../middlewares/authentication';


const accountRouter = new Router();
const { createAccount, activateDeactivate } = accountController;

accountRouter.post('/', requireAuth, createAccount);
accountRouter.patch('/:accountNo', requireAuth, staffAuth, activateDeactivate);
export default accountRouter;
