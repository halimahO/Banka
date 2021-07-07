import Transaction from '../models/transactionModel';
import Account from '../models/accountModel';
import sendMail from '../helpers/sendMail';


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
    transaction.type = (req.route.path.indexOf('transfer') !== -1) ? 'transfer' : 'debit';
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.newbalance = balance - transaction.amount;

    const newTransaction = await transaction.debit();
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;

   const emaildata = {
     account: accountExists.accountnumber,
     amount: transaction.amount,
     oldbalance: transaction.oldbalance,
     newbalance: transaction.newbalance,
     email: accountExists.owneremail,
     Transactiontype: type,
   };
    sendMail(emaildata, res);
    if (typeof accountNumber === 'string') {
      return newTransaction;
    }
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

  static async credit(req, res, accountNumber) {
    const accountnumber = (typeof accountNumber === 'string') ? accountNumber : req.params.accountnumber;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      const error = (typeof accountNumber === 'string') ? 'Account to be transfered to doesnt exist' : 'Account does not exist.'
      return res.status(404).json({
        status: 404,
        error,
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
    transaction.type = (req.route.path.indexOf('transfer') !== -1) ? 'transfer' : 'credit';
    transaction.cashier = req.user.id;
    transaction.oldbalance = parseFloat(balance);
    transaction.newbalance = parseFloat(balance) + parseFloat(transaction.amount);
    const newTransaction = await transaction.credit(balance);
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;


   const emaildata = {
     account: accountExists.accountnumber,
     amount: transaction.amount,
     oldbalance: transaction.oldbalance,
     newbalance: transaction.newbalance,
     email: accountExists.owneremail,
     Transactiontype: type,
   };

 sendMail(emaildata, res);

    if (typeof accountNumber === 'string') {
      return newTransaction;
    }

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

  static async transfer(req, res) {
    const accountExists = await Account.getAccount(req.params.accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account to does not exist.',
      });
    }

    const creditAccount = await TransactionController.credit(req, res, req.body.acctNo);
    if (creditAccount.id) {
      const debitAccount = await TransactionController.debit(req, res);
      return debitAccount;
    }
    return creditAccount;
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
