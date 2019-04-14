// params
const wrongAcctNo = {
  accountNumber: '1234',
};

const wrongId = {
  accountNumber: 'as2',
};

// user
const clientField = {
  email: 'testClient@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};
const clientField2 = {
  email: 'testClient2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};

const staffField = {
  firstName: 'Ade',
  lastName: 'Bade',
  email: 'adebade1@gmail.com',
  password: 'adebade1234',
  isAdmin: false,
};

const staffField2 = {
  email: 'testStaff@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: false,
};

const adminField = {
  firstName: 'Ade',
  lastName: 'Bade',
  email: 'adebade11@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};

const adminField2 = {
  email: 'testAdmin@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: true,
};

const missingClient = {
  lastName: 'Bade',
  email: 'adebade3@gmail.com',
  password: 'adebade1234',
};

const missingStaff = {
  firstName: 'Ade',
  lastName: 'Bade',
  password: 'adebade1234',
  isAdmin: false,
};

const missingAdmin = {
  lastName: 'Bade',
  email: 'adebade31@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};
const emptyClient = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const emptyStaff = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: '',
};

const emptyAdmin = {
  firstName: '',
  lastName: 'Bade',
  email: '',
  password: '',
  isAdmin: '',
};

const emptyLogin = {
  email: '',
  password: '',
};

const missingLogin = {
  password: 'password',
};

const wrongLogin = {
  accountNumber: 'as2',
};

const login = {
  email: 'testClient2@gmail.com',
  password: 'asdfghjkl',
};

// Account
const emptyAccount = {
  type: '',
};

const account = {
  type: 'savings',
};

const wrongAccount = {
  type: 'everyday account',
};

// Transaction
const emptytransaction = {
  amount: '',
};

const transaction = {
  amount: 10000,
};

const wrongTransaction = {
  amount: '20K',
};

// testAdmin
const testAdmin = {
  firstName: 'Adeq',
  lastName: 'Badeww',
  email: 'adebadewww@gmail.com',
  password: 'adebade1234',
};

const missingtestAdmin = {
  lastName: 'Bade',
  email: 'adebade31@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};

const emptyTestAdmin = {
  firstName: '',
  lastName: 'Bade',
  email: '',
  password: '',
  isAdmin: '',
};
export {
  wrongAcctNo, wrongId, wrongAccount, wrongLogin, wrongTransaction,
  clientField, adminField, staffField, missingAdmin, missingClient,
  missingLogin, missingStaff, missingtestAdmin, emptyAccount, emptyAdmin,
  emptyClient, emptyLogin, emptyStaff, emptyTestAdmin, emptytransaction,
  login, account, transaction, testAdmin, clientField2, adminField2, staffField2,
};
