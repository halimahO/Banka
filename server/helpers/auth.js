import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);


const secretKey = 'secretkey';
export const generateToken = (id) => {	
	return jwt.sign({userId: id,}, secretKey, { expiresIn: '1week' });
};

export const verifyToken = (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (e) {
      return { error: `${e}` };
    }
  }
