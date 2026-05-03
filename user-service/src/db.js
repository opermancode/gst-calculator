import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'usersdb',
  port: 5432,
  ssl: { 
    rejectUnauthorized: false   // Required for AWS RDS
  }
});

export default pool;
