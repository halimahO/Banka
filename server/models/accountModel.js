import pool from '../database/index';
import databaseController from "../database/dbQueryOperator";
import generateAcctNo from '../helpers/generateAcctNo';

export default class Account {
  constructor(account) {
    this.id = account.id;
    this.accountNumber = account.accountNumber;
    this.owner = account.owner;
    this.type = account.type;
    this.status = 'active';
    this.createdon = new Date(Date.now());
    this.balance = 0;
    this.owneremail = account.owneremail;
  }

  async createAccount() {
    const queryString = `INSERT INTO accounts (accountnumber, createdon,
      owner, type, status, balance, owneremail)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      generateAcctNo(), this.createdon, this.owner,
      this.type, this.status, this.balance, this.owneremail,
    ];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async getAccount(accountnumber) {
    const queryString = 'SELECT * FROM accounts WHERE accountnumber = $1';
    const values = [accountnumber];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async changeStatus(account) {
    const { status, accountnumber } = account;
    const queryString = `UPDATE accounts SET status = '${status}' where accountnumber = ${accountnumber} RETURNING *`;
    const { rows } = await pool.query(queryString);
    return rows[0];
  }

  static async deleteAccount(accountnumber) {
    const queryString = 'DELETE FROM accounts WHERE accountnumber = $1';
    const values = [accountnumber];
    const result = await pool.query(queryString, values);
    return result;
  }

  static async accountTransactionHistory(accountnumber) {
    const queryString = 'SELECT * FROM transactions WHERE accountnumber = $1';
    const values = [accountnumber];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async getAllAccounts(data, callbk) {
    const { startDate, endDate, status} = data;
    try {
      const account = await databaseController.getAllAccount([startDate, endDate, status]);
      callbk(null, account);
    } catch (err) {
      callbk({ message: err.message }, null);
    }
    
    // const queryString = 'SELECT * FROM accounts';
    // try {
    //   const { rows } = await pool.query(queryString);
    //   return rows;
    // } catch (error) {
    //   return error.message;
    // }
  }

  // static async getByDate() {
  //   const queryString = 'SELECT * FROM accounts WHERE (createdon >= $1::date or $1 is null) AND (createdon <= $2::date  + "1 day"::interval or $2 is null)';
  //   try {
  //     const { rows } = await pool.query(queryString);
  //     return rows;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

//   static async dormant() {
//     const queryString = 'SELECT * FROM accounts WHERE status = \'dormant\'';
//     try {
//       const { rows } = await pool.query(queryString);
//       return rows;
//     } catch (error) {
//       return error.message;
//     }
//   }

//   static async active() {
//     const queryString = 'SELECT * FROM accounts WHERE status = \'active\'';
//     try {
//       const { rows } = await pool.query(queryString);
//       return rows;
//     } catch (error) {
//       return error.message;
//     }
//   }
}
