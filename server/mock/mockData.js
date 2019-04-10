class Data {
    constructor() {
      this.users = [{
        id: 1,
        firstname: 'Mary',
        lastname: 'Moore',
        email: 'marymore@gmail.com',
        password: '$2a$10$FagkzXXK9BjSvbc2ks/0buuSco0SCsN53YyJKMbkSvgA5hFOSdWeS',
        type: 'client',
        isAdmin: false,
        noOfAccounts: 1,
      }, {
        id: 2,
        firstname: 'Grey',
        lastname: 'Williams',
        email: 'greywilliams@gmail.com',
        password: '$2a$10$FagkzXXK9BjSvbc2ks/0buuSco0SCsN53YyJKMbkSvgA5hFOSdWeS',
        type: 'staff',
        isAdmin: false,
        noOfAccounts: 1,
      },
      {
        id: 3,
        firstname: 'Tory',
        lastname: 'Adigun',
        email: 'toryadigun@gmail.com',
        password: '$2a$10$FagkzXXK9BjSvbc2ks/0buuSco0SCsN53YyJKMbkSvgA5hFOSdWeS',
        type: 'admin',
        isAdmin: true,
        noOfAccounts: 1,
      }];
      this.accounts = [{
        id: 1,
        accountNumber: 1234567890,
        createdOn: '2018-31-05',
        type: 'savings',
        owner: 1,
        status: 'active',
        balance: 5000.00,
      }, {
        id: 2,
        accountNumber: 2234567890,
        createdOn: '2017-31-05',
        type: 'current',
        owner: 2,
        status: 'active',
        balance: 15000.00,
      }, {
        id: 3,
        accountNumber: 3234567890,
        createdOn: '2016-31-05',
        type: 'savings',
        owner: 3,
        status: 'active',
        balance: 50000.00,
      }];
      this.transactions = [{
        id: 1,
        createdOn: '2019-31-05',
        type: 'credit',
        accountNumber: 1234567890,
        cashier: 2,
        amount: 3000.00,
        oldbalance: 2000.00,
        newbalance: 5000.00,
      }, {
        id: 2,
        createdOn: '2016-31-05',
        type: 'debit',
        accountNumber: 1234567890,
        cashier: 2,
        amount: 7000.00,
        oldbalance: 10000.00,
        newbalance: 3000.00,
      }];
    }
  }
  const data = new Data();
  
  export default data;
  