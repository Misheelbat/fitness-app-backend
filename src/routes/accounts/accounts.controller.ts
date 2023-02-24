import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';
import pool from '../../db';
import { Account } from '../../models/Account';

async function getAllAccounts(req: Request, res: Response) {
	try {
		const allAccounts = await pool.query('SELECT * FROM accounts');
		return res.status(200).json(allAccounts.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

async function getAccountById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const account = await pool.query(
			'SELECT * FROM accounts WHERE account_id = $1',
			[id]
		);
		res.status(200).json(account.rows);
	} catch (err: any) {
		return res.status(400).json({
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

		let hashedPassword = await bcrypt.hash(credentials.password, 10);
		const newAccount = await pool.query(
			'INSERT INTO accounts (name,email,password) VALUES ($1, $2, $3) ',
			[credentials.name, credentials.email, hashedPassword]
		);
		res.status(200).json(newAccount);
	} catch (err: any) {
		return res.status(400).json({
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
		return res.status(400).json({
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
		return res.status(400).json({
			error: err.message,
		});
	}
}

export {
	getAllAccounts,
	getAccountById,
	createNewAccount,
	updateAccountById,
	deleteAccountById,
};
