import { Router } from 'express';
import transactionController from '../controllers/transactionController';
import { requireAuth, cashierAuth } from '../middlewares/authentication';


const transactionRouter = new Router();
const {
  debitAccount, creditAccount, transactionHistory,
  specificTransaction,
} = transactionController;

transactionRouter.post('/:accountNo/debit', requireAuth, cashierAuth, debitAccount);
transactionRouter.post('/:accountNo/credit', requireAuth, cashierAuth, creditAccount);
transactionRouter.get('/:accountNo', requireAuth, transactionHistory);
transactionRouter.get('/:accountNo/:transactionId', requireAuth, specificTransaction);
export default transactionRouter;
