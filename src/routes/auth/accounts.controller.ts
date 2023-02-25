import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';
import pool from '../../db';
import { Account } from '../../models/Account';
import { jwtGenerator } from '../../utils/jwtGenerator';

async function verifyAccount(req: Request, res: Response) {
	try {
		// const allAccounts = await pool.query('SELECT * FROM accounts');
		return res.status(200).json(true);
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function getUser(req: Request, res: Response) {
	try {
		const existingAccount = req.account;
		const account = await pool.query(
			'SELECT account_id, name, email FROM accounts WHERE account_id = $1',
			[existingAccount]
		);
		res.status(200).json(account.rows[0]);
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function createNewAccount(req: Request, res: Response) {
	try {
		const credentials = req.body;
		const safeCredentials = Account.safeParse(credentials);

		if (!safeCredentials.success) {
			throw fromZodError(safeCredentials.error);
		}

		const userExist = await pool.query(
			'SELECT * FROM accounts WHERE email = $1',
			[credentials.email]
		);

		if (userExist.rows.length !== 0) {
			return res.status(401).json({
				error: 'Email is already in use',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(credentials.password, salt);

		const newAccount = await pool.query(
			'INSERT INTO accounts (name,email,password) VALUES ($1, $2, $3) RETURNING *',
			[credentials.name, credentials.email, hashedPassword]
		);

		const token = jwtGenerator(newAccount.rows[0].account_id);
		res.json({ token });
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function updateAccountById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { name } = req.body;
		await pool.query('UPDATE accounts SET name = $1 WHERE account_id = $2', [
			name,
			id,
		]);
		res.status(200).json('updated Account Info');
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function deleteAccountById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		await pool.query('DELETE FROM accounts  WHERE account_id = $1', [id]);
		res.json('Account Info deleted');
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function loginAccount(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const userExist = await pool.query(
			'SELECT * FROM accounts WHERE email = $1',
			[email]
		);

		if (userExist.rows.length === 0) {
			return res.status(401).json({
				error: 'Password or Email is incorrect',
			});
		}

		const validPassword = await bcrypt.compare(
			password,
			userExist.rows[0].password
		);

		if (!validPassword) {
			return res.status(401).json({
				error: 'Password or Email is incorrect',
			});
		}
		const token = jwtGenerator(userExist.rows[0].account_id);
		res.status(200).json({ token });
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

export {
	verifyAccount,
	getUser,
	createNewAccount,
	updateAccountById,
	deleteAccountById,
	loginAccount,
};
