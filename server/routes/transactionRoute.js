import { Router } from 'express';
import transactionController from '../controllers/transactionController';
import { requireAuth, cashierAuth } from '../middlewares/authentication';


const transactionRouter = new Router();
const { debitAccount } = transactionController;

transactionRouter.post('/:accountNo/debit', requireAuth, cashierAuth, debitAccount);

export default transactionRouter;
