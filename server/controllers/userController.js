import User from '../models/userModel';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/auth';
import mail from '../helpers/mailer';


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
      id,
      firstname,
      lastname,
      email,
      type,
      isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id,
      email,
      type,
      isadmin,
      firstname,
      lastname,
    });

    const name = `${user.lastname}`;
    const message = mail.newuser(name, user.email);
    mail.sendMail(message);

    const response = {
      token,
      id,
      firstname,
      lastname,
      email,
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
      id,
      firstname,
      lastname,
      email,
      type,
      isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id,
      email,
      type,
      isadmin,
      firstname,
      lastname,
    });

    const response = {
      token,
      id,
      firstname,
      lastname,
      email,
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
      id,
      firstname,
      lastname,
      email,
      type,
      isadmin,
    } = newUser;

    const token = await Jwt.generateToken({
      id,
      email,
      type,
      isadmin,
      firstname,
      lastname,
    });

    const response = {
      token,
      id,
      firstname,
      lastname,
      email,
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
      id,
      firstname,
      lastname,
      type,
      isadmin,
    } = result;

    const token = await Jwt.generateToken({
      id,
      email,
      type,
      isadmin,
      firstname,
      lastname,
    });

    const response = {
      token,
      id,
      firstname,
      lastname,
      email,
    };

    return res.status(200).json({
      status: 200,
      data: response,
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
        createdon,
        accountnumber,
        type,
        status,
        balance,
      } = rest;
      return {
        createdon,
        accountnumber,
        type,
        status,
        balance,
      };
    });
    return res.status(200).json({
      status: 200,
      accounts: results,
    });
  }
}
