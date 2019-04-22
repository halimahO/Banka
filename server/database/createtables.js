import pool from './index';

console.log('Creating tables...');

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        type VARCHAR(10) NOT NULL,
        isadmin BOOLEAN DEFAULT FALSE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        accountnumber BIGINT NOT NULL,
        createdon TIMESTAMPTZ DEFAULT NOW(),
        owner INT NOT NULL,
        type VARCHAR(10) NOT NULL,
        status VARCHAR(10) NOT NULL,
        balance FLOAT,
        owneremail VARCHAR(50) UNIQUE NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (owneremail) REFERENCES users (email) ON DELETE CASCADE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        createdon TIMESTAMPTZ DEFAULT NOW(),
        type VARCHAR(20) NOT NULL,
        accountnumber BIGINT NOT NULL,
        cashier INT NOT NULL,
        amount FLOAT NOT NULL,
        oldbalance FLOAT NOT NULL,
        newbalance FLOAT NOT NULL,
        FOREIGN KEY (cashier) REFERENCES users (id) ON DELETE CASCADE)`);
  } catch (error) {
    console.log(error);
  }
  console.log('Created all tables.');
})();
