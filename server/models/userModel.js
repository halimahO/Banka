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

  static async signUp() {
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING firstname, lastname,
        email`;
    const values = [this.email, this.firstName, this.lastName, this.password,
      this.type, this.isadmin];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (err) {
      return err.message;
    }
  }

  static async getEmail(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (err) {
      return err.message;
    }
  }
}
