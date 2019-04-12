import { Router } from 'express';
import accountController from '../controllers/accountController';
import { requireAuth, staffAuth } from '../middlewares/authentication';


const accountRouter = new Router();
const {
  createAccount, activateDeactivate, deleteAccount, oneUserAccount,
} = accountController;

accountRouter.post('/', requireAuth, createAccount);
accountRouter.patch('/:accountNo', requireAuth, staffAuth, activateDeactivate);
accountRouter.delete('/:accountNo', requireAuth, staffAuth, deleteAccount);
accountRouter.get('/:accountNo', requireAuth, staffAuth, oneUserAccount);
export default accountRouter;
