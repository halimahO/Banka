import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class userValidate {
  static login(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      // password: 'required|alpha_dash|min:6|max:16',
    };

    const validator = new Validator(user, userProperties, customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  }
}
