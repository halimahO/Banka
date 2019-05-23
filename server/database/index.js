import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// const obj = {
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.DBPORT,
//   host: process.env.HOST,
// };
// const pool = new Pool(obj);
const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('connected to the db');
});

export default pool;
