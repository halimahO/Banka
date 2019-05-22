import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

 const development = {
        user: 'postgres',
        host: 'localhost',
        database: 'banka2',
        password: '',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000,
    };

//const pool = new Pool({ connectionString });
const pool = new Pool(development);

pool.on('connect', () => {
  console.log('connected to the db');
});

export default pool;
