import pool from '../database/index';

import {
  hashPassword,
  comparePassword,
  generateToken,
} from '../helpers/auth';

const User = {
  async signUp(req, res) {
    const type = 'client';
    const isadmin = false;
    const text = `INSERT INTO users (email, firstname, lastname, password, type, isadmin)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email`;
    const values = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      hashPassword(req.body.password),
      type,
      isadmin,
    ];

    try {
      const { rows } = await pool.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  },


};
export default User;
