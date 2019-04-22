import User from '../models/userModel';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/auth';

export default class UsersController {
  static async signUp(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }
    console.log(user);

    const newUser = await user.signUp();

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = Jwt.generateToken({
      id, email, type, isadmin,
    });

    const response = {
      token, id, firstname, lastname, email,
    };
    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async createStaff(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }

    const newUser = await user.signUp();

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = Jwt.generateToken({
      id, email, type, isadmin,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(201).json({
      status: 201,
      data: response,
    });
  }
}
