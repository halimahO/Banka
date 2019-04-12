import TransactionModel from '../models/transactionModel';
import data from '../mock/mockData';

const { accounts, transactions } = data;

class Transactions {
  static async debitAccount(req, res) {
    const id = transactions.length + 1;
    const { accountNo } = req.params;
    const { amount } = req.body;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    const oldBalance = account[0].balance;
    const cashier = req.user.id;

    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        message: `Account ${accountNo} not found`,
      });
    }

    const transaction = await new TransactionModel(id, accountNo, amount, cashier, oldBalance);

    if (transaction.oldBalance >= amount) {
      transaction.newBalance = transaction.oldBalance - amount;
      account[0].balance = transaction.newBalance;
      transactions.push(transaction);

      const response = {
        transactionId: transactions.length,
        accountNo,
        amount: Number(amount),
        cashier: req.user.id,
        transactionType: transaction.type,
        accountBalance: String(transaction.newBalance),
      };
      res.status(200).json({
        status: 200,
        data: response,
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'Insufficient fund',
      });
    }
  }
}
export default Transactions;
