import pool from '../database/index';

export default class Transaction {
  constructor(transaction) {
    this.id = transaction.id;
    this.createdon = new Date(Date.now());
    this.type = transaction.type;
    this.accountnumber = transaction.accountnumber;
    this.cashier = transaction.cashier;
    this.amount = transaction.amount;
    this.oldbalance = transaction.oldbalance;
    this.newbalance = transaction.newbalance;
  }

  async debit() {
    const queryString = `INSERT INTO transactions (accountnumber, createdon,
      cashier, type, amount, oldbalance, newbalance)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [
      this.accountnumber, this.createdon, this.cashier,
      'debit', this.amount, this.oldbalance, this.newbalance,
    ];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }
}
