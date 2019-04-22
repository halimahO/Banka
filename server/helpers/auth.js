/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.secretKey;


export default class Jwt {
  static async generateToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '14d' });
    return token;
  }

  static async verifyToken(token) {
    try {
      const decoded = await jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return err.message;
    }
  }
}
