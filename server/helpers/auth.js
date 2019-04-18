import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hash, password) => bcrypt.compareSync(hash, password);


const secretKey = 'secretkey';
export const generateToken = payload => jwt.sign(payload, secretKey, { expiresIn: '1week' });

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
