import Account from '../models/accountModel';

export default class AccountController {
  static async createAccount(req, res) {
    const account = new Account(req.body);

    account.owner = req.user.id;
    account.owneremail = req.user.email;

    const newAccount = await account.createAccount();
    return res.status(201).json({
      status: 201,
      data: newAccount,
    });
  }

  static async changeStatus(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account number not found.',
      });
    }
    const status = req.body;

    const { status: currentStatus } = accountExists;
    if (status === currentStatus) {
      return res.status(400).json({
        status: 400,
        error: `Account ${accountnumber} is currently ${status}`,
      });
    }
    accountExists.status = status || accountExists.status;

    const result = await Account.changeStatus(accountExists);
    return res.status(200).json({
      status: 200,
      message: 'status changed successfully',
      data: result,
    });
  }

  static async deleteAccount(req, res) {
    const { accountnumber } = req.params;

    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account number not found.',
      });
    }
    await Account.deleteAccount(accountnumber);
    return res.status(200).json({
      status: 200,
      message: 'Account deleted sucessfuly',
    });
  }
}
