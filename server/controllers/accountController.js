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
}
