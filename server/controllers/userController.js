import User from '../models/userModel';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/auth';

export default class UsersController {
  static async signUp(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    console.log(userExists);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }
    let newUser;
    try {
      newUser = await user.signUp();
    } catch (error) {
      return error.message;
    }

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
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

    let newUser;
    try {
      newUser = await user.createStaff();
    } catch (error) {
      return error.message;
    }

    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async createAdmin(req, res) {
    const user = new User(req.body);

    user.password = hashPassword(user.password);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email address is already taken.',
      });
    }

    let newUser;
    try {
      newUser = await user.createAdmin();
    } catch (error) {
      return error.message;
    }
    const {
      id, firstname, lastname, email,
      type, isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async signin(req, res) {
    const { email, password } = req.body;

    let result;
    try {
      result = await User.signin(email);
    } catch (error) {
      return error.message;
    }

    if (!result) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid username/password',
      });
    }

    const { password: userPassword } = result;
    if (!comparePassword(password, userPassword)) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid username/password',
      });
    }

    const {
      id, firstname, lastname,
      type, isadmin,
    } = result;

    const token = await Jwt.generateToken({
      id, email, type, isadmin, firstname, lastname,
    });

    const response = {
      token, id, firstname, lastname, email,
    };

    return res.status(200).json({
      status: 200,
      data: response,
    });
  }

  static async resetPassword(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    let result;
    try {
      result = await User.getUserByEmail(email);
    } catch (error) {
      return error.message;
    }

    if (!result) {
      return res.status(400).json({
        status: 400,
        error: 'No user with the given email',
      });
    }

    const { password: userPassword } = result;

    if (oldPassword) {
      if (!comparePassword(oldPassword, userPassword)) {
        return res.status(400).json({
          status: 400,
          error: 'Old password is not correct',
        });
      }
    }

    if (comparePassword(newPassword, userPassword)) {
      return res.status(400).json({
        status: 400,
        error: 'New password cannot be the same as old password',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Passwords don\'t match',
      });
    }

    const hashedPassword = hashPassword(newPassword);

    let resetResult;
    try {
      resetResult = await User.resetPassword(hashedPassword, email);
    } catch (error) {
      return error.message;
    }

    const {
      firstname, lastname, type, isadmin,
    } = resetResult;

    return res.status(200).json({
      status: 200,
      message: 'Password reset succesful',
      data: {
        firstname,
        lastname,
        type,
        isadmin,
      },
    });
  }

  static async allUserAccounts(req, res) {
    const { email } = req.params;

    const userExists = await User.getUserByEmail(email);
    if (!userExists) {
      return res.status(404).json({
        status: 404,
        error: 'User not found.',
      });
    }
    let result;
    try {
      result = await User.allUserAccounts(email);
    } catch (error) {
      return error.message;
    }
    if (!result.length) {
      return res.status(404).json({
        status: 404,
        error: 'User has no account.',
      });
    }
    const results = result.map((rest) => {
      const {
        createdon, accountnumber, type, status, balance,
      } = rest;
      return {
        createdon, accountnumber, type, status, balance,
      };
    });
    return res.status(200).json({
      status: 200,
      accounts: results,
    });
  }
}
