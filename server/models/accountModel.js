import pool from '../database/index';
import generateAcctNo from '../helpers/generateAcctNo';

export default class Account {
  constructor(account) {
    this.id = account.id;
    this.accountNumber = account.accountNumber;
    this.owner = account.owner;
    this.type = account.type;
    this.status = 'active';
    this.createdon = new Date(Date.now());
    this.balance = parseFloat(0.0);
    this.owneremail = account.owneremail;
  }

  static async createAccount() {
    const queryString = `INSERT INTO accounts (accountnumber, createdon,
      owner, type, status, balance, owneremail)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING accountnumber, createdon,
      owner, type, status`;
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
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async changeStatus(account) {
    const { status } = account;
    const queryString = 'UPDATE accounts SET status = $1 RETURNING *';
    const values = [status];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async deleteAccount(accountnumber) {
    const queryString = 'DELETE FROM meetups WHERE id = $1';
    const values = [accountnumber];
    try {
      const result = await pool.query(queryString, values);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
