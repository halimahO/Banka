import pool from '../database/index';

export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.type = user.type;
    this.isadmin = user.isadmin;
  }

  async signUp() {
    const type = 'client';
    const isadmin = false;
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, type, isadmin`;
    const values = [this.email, this.firstname, this.lastname,
      this.password, type, isadmin];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async createStaff() {
    const type = 'staff';
    const isadmin = false;
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, type, isadmin`;
    const values = [this.email, this.firstname, this.lastname,
      this.password, type, isadmin];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }
}
