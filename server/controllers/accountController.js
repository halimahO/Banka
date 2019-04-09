import accountModel from '../models/accountModel';
import data from '../mock/mockData'
import generateAcctNo from '../helpers/generateAcctNo';

const { users, accounts } = data;

class Accounts {
    static async createAccount(req, res) {
        const id = accounts.length + 1;
        const accountNumber = generateAcctNo();
        const { type } = req.body;
        const { userId } = req.params;
        const user = users.filter(user => user.id === Number(userId));
        const account = new accountModel(id, accountNumber, type);
        account.owner = user[0].id;
        user[0].noOfAccounts += 1;
        accounts.push(account);
        const response = {
            "accountNumber": accountNumber,
            "firstname": user[0].firstname,
            "lastname": user[0].lastname,
            "email": user[0].email,
            "type": type,
            "openingBalance":0.00,
        }
        res.status(201).json({
        status: 201,
        data: response,
      });
      }
}

export default Accounts;
