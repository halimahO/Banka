import AccountModel from '../models/accountModel';
import data from '../mock/mockData';
import generateAcctNo from '../helpers/generateAcctNo';

const { users, accounts } = data;

class Accounts {
  static async createAccount(req, res) {
    const id = accounts.length + 1;
    const accountNumber = generateAcctNo();
    const { type } = req.body;
    const userId = req.user.id;
    const user = users.filter(u => u.id === Number(userId));
    const account = await new AccountModel(id, accountNumber, type);
    account.owner = user[0].id;
    user[0].noOfAccounts += 1;
    accounts.push(account);
    const response = {
      accountNumber,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      email: user[0].email,
      type,
      openingBalance: 0.00,
    };
    res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static activateDeactivate(req, res) {
    const { accountNo } = req.params;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        message: `Account ${accountNo} not found`,
      });
    } else {
      if (account[0].status === 'active') {
        account[0].status = 'dormant';
      } else {
        account[0].status = 'active';
      }
      const response = {
        accountNumber: account[0].accountNumber,
        status: account[0].status,
      };
      res.status(200).json({
        status: 200,
        data: response,
      });
    }
  }

  static deleteAccount(req, res) {
    const { accountNo } = req.params;
    const acctIndex = accounts.findIndex(acct => acct.accountNumber === Number(accountNo));
    if (acctIndex < 0) {
      res.status(404).json({
        status: 404,
        message: `Delete error! Account ${accountNo} not found`,
      });
    } else {
      accounts.splice(acctIndex, 1);
      res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    }
  }
}
export default Accounts;
