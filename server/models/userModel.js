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
    this.avatar = '';
  }

  async signUp() {
    const type = 'client';
    const isadmin = false;
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin, avatar)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, email, type, isadmin, avatar`;
    const values = [this.email, this.firstname, this.lastname,
      this.password, type, isadmin, this.avatar];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  async createStaff() {
    const type = 'staff';
    const isadmin = false;
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin, avatar)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, type, isadmin, avatar`;
    const values = [this.email, this.firstname, this.lastname,
      this.password, type, isadmin, this.avatar];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  async createAdmin() {
    const type = 'staff';
    const isadmin = true;
    const queryString = `INSERT INTO users (email, firstname, lastname, password, type, isadmin, avatar)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, type, isadmin, avatar`;
    const values = [this.email, this.firstname, this.lastname,
      this.password, type, isadmin, this.avatar];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async signin(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async getUserByEmail(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async allUserAccounts(email) {
    const queryString = 'SELECT * FROM accounts WHERE owneremail = $1';
    const values = [email];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async updateProfilePicture(avatar, email) {
    const queryString = 'UPDATE users SET avatar = $1 WHERE email = $2';
    const values = [avatar, email];
    try {
      const { rows } = await pool.query(queryString, values);
      return rows;
    } catch (error) {
      return error.message;
    }
  }
}
