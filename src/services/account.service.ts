import { CreateAccountInput } from '../schema/Account.schema';
import hashPassword from '../utils/hashPassword';
import jwtGenerator from '../utils/jwtGenerator';
import pool from '../db';

async function createAccountToken(input: CreateAccountInput) {
	const userExist = await findAccountByEmail(input.email);
	try {
		if (userExist.rows.length !== 0) {
			throw new Error('Email is already in use');
		}

		const hashedPassword = await hashPassword(input.password);
		const newAccount = await pool.query(
			'INSERT INTO accounts (name,email,password) VALUES ($1, $2, $3) RETURNING *',
			[input.name, input.email, hashedPassword]
		);
		const token = jwtGenerator(newAccount.rows[0].account_id);
		return token;
	} catch (err: any) {
		throw new Error(err.message);
	}
}

async function findAccountByEmail(email: string) {
	try {
		const account = await pool.query(
			'SELECT * FROM accounts WHERE email = $1',
			[email]
		);
		return account;
	} catch (e: any) {
		throw new Error(e.message);
	}
}

export { createAccountToken, findAccountByEmail };
