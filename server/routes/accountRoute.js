import { Router } from 'express';
import accountController from '../controllers/accountController';
import { requireAuth, staffAuth } from '../middlewares/authentication';
import paramsValidate from '../middlewares/validateParams';
import accountValidate from '../middlewares/validateAccount';

const accountRouter = new Router();
const {
  createAccount, changeStatus, deleteAccount, accountTransactionHistory,
  getAccount, getAllAccounts, queryAccountsByStatus,
} = accountController;

accountRouter.post(
  '/',
  requireAuth,
  accountValidate.createAccount,
  createAccount,
);

accountRouter.patch('/:accountnumber',
  requireAuth,
  staffAuth,
  paramsValidate.acctNo,
  accountValidate.changeStatus,
  changeStatus);

export default accountRouter;
