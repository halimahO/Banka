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

  static recharge(req, res, next) {
    const { body } = req;
    Validator.register('network_number', (value) => {
      switch (value.toLowerCase()) {
        case 'mtn':
          return /^(0[789][01][364])/.test(req.body.phonenumber);
        case '9mobile':
          return /^(0[789][01][978])/.test(req.body.phonenumber);
        case 'airtel':
          return /^(0[789][01][8271])/.test(req.body.phonenumber);
        case 'glo':
          return /^(0[789][01][517])/.test(req.body.phonenumber);
        default:
          return false;
      }
    }, 'Network number is not valid');

    const validator = new Validator(body, {
      amount: 'required|numeric|min:50|max:10000',
      network: 'required|network_number',
      phonenumber: 'required|numeric|digits:11',
    }, 'Network number is invalid');
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
