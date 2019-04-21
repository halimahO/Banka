import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
// const connectionString = 'postgres://Haleema:password@127.0.0.1:5432/banka_db';

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('connected to the db');
});

export default pool;
