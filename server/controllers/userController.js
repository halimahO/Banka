import userModel from '../models/userModel';
import data from '../mock/mockData';
import {hashPassword, generateToken} from '../helpers/auth';

const { users } = data;

class Users {
    static async createUser(req, res) {
        const id = users.length + 1;
        const {firstName, lastName, email, password,} = req.body;
        const passwordHash = hashPassword(password);
        const token = generateToken(id);
        const type = 'client';
        const isAdmin = false;
        const user = await new userModel(id, email, firstName, lastName, passwordHash, type, isAdmin);
        users.push(user);
        const response = {
            "token": token,
            "id": id,
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
        }
        res.status(201).json({
        status: 201,
        data: response,
      });
      }
    }
export default Users;
