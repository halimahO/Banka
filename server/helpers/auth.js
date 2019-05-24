/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.secretKey;


export default class Jwt {
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '14d' });
    return token;
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }
}
