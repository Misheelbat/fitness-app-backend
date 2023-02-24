import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

// const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: String(process.env.POSTGRES_PASS),
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT as string),
	database: process.env.POSTGRES_DB_NAME,
});

export default pool;
