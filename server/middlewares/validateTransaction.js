import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class transactionValidate {
  static amount(req, res, next) {
    const transaction = req.body;

    const transactionProperties = {
      amount: 'required|numeric|min:500|max:10000000',
    };

    const validator = new Validator(transaction,
      transactionProperties,
      customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  }

  static acctNo(req, res, next) {

    const acctProperties = {
      acctNo: 'required|numeric|digits:10',
    };

    const validator = new Validator(req.body,
      acctProperties,
      customErrorMsgs);

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
