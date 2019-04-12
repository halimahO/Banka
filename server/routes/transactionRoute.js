import { Router } from 'express';
import transactionController from '../controllers/transactionController';
import { requireAuth, cashierAuth } from '../middlewares/authentication';
import paramsValidate from '../middlewares/validateParams';


const transactionRouter = new Router();
const {
  debitAccount, creditAccount, transactionHistory,
  specificTransaction,
} = transactionController;

transactionRouter.post('/debit', requireAuth, cashierAuth, debitAccount);
transactionRouter.post('/credit', requireAuth, cashierAuth, creditAccount);
transactionRouter.get('/', requireAuth, transactionHistory);
transactionRouter.get('/:transactionId', requireAuth, paramsValidate.transId, specificTransaction);
export default transactionRouter;
