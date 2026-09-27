import { Pool } from 'pg';
import 'dotenv/config';
console.log('DB_PORT from env:', process.env.DB_PORT);


export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});