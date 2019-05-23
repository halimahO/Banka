import Transaction from '../models/transactionModel';
import Account from '../models/accountModel';
import UsersController from './userController';

export default class TransactionController {
  static async debit(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const { balance } = accountExists;
    let transaction;
    try {
      transaction = new Transaction(req.body);
    } catch (error) {
      return error.message;
    }

    if (balance < transaction.amount) {
      return res.status(422).json({
        status: 422,
        error: 'Insufficient fund',
      });
    }

    transaction.accountnumber = accountnumber;
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.newbalance = balance - transaction.amount;

    const newTransaction = await transaction.debit();
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;
    const { owneremail } = accountExists;

    const emailObj = {
      email: owneremail,
      subject: 'Debit Transaction',
      body:  `
        <h1> A Transaction has occurred on your account with account number: ${accountnumber} </h1>
        <br />
        <h3>Transaction details</h3>
        <p>
         Transaction ID: ${id} <br />
         Amount: ${parseFloat(amount)} <br />
         Cashier: ${cashier} <br />
         Account Balance: ${String(newbalance)}
        
        </p>
      `,
    };
  await UsersController.notify(emailObj);
    return res.status(201).json({
      status: 201,
      data: {
        transactionId: id,
        accountnumber,
        amount: parseFloat(amount),
        cashier,
        transactionType: type,
        accountBalance: String(newbalance),
      },
    });
  }

  static async credit(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const { balance } = accountExists;
    let transaction;
    try {
      transaction = new Transaction(req.body);
    } catch (error) {
      return error.message;
    }

    transaction.accountnumber = accountnumber;
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.newbalance = balance + transaction.amount;
    const newTransaction = await transaction.credit(balance);
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;

    const { owneremail } = accountExists;

    const emailObj = {
      email: owneremail,
      subject: 'Credit Transaction',
      body:  `
        <h1> A Transaction has occurred on your account with account number: ${accountnumber} </h1>
        <br />
        <h3>Transaction details</h3>
        <p>
         Transaction ID: ${id} <br />
         Amount: ${parseFloat(amount)} <br />
         Cashier: ${cashier} <br />
         Account Balance: ${String(newbalance)}
        
        </p>
      `,
    };
    await UsersController.notify(emailObj);

    return res.status(201).json({
      status: 201,
      data: {
        transactionId: id,
        accountnumber,
        amount,
        cashier,
        transactionType: type,
        accountBalance: newbalance,
      },
    });
  }

  static async getTransaction(req, res) {
    const { id } = req.params;

    const result = await Transaction.getTransaction(id);
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: 'Transaction does not exist.',
      });
    }
    const {
      createdon, type, accountnumber, amount, oldbalance, newbalance,
    } = result;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: id,
        createdon,
        type,
        accountNumber: Number(accountnumber),
        amount,
        oldbalance,
        newbalance,
      },
    });
  }
}
