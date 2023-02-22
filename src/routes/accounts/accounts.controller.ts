import { Request, Response } from 'express';
import pool from '../../db';

async function getAllAccounts(req: Request, res: Response) {
	try {
		const allAccounts = await pool.query('SELECT * FROM accounts');
		return res.status(200).json(allAccounts.rows);
	} catch (error: any) {
		console.log(error.message);
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
	} catch (error: any) {
		console.log(error.message);
	}
}
async function createNewAccount(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;
		const newAccount = await pool.query(
			'INSERT INTO accounts (name,email,password) VALUES ($1, $2, $3) ',
			[name, email, password]
		);
		res.status(200).json(newAccount);
	} catch (error: any) {
		console.log(error.message);
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
	} catch (error: any) {
		console.log(error.message);
	}
}
async function deleteAccountById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		await pool.query('DELETE FROM accounts  WHERE account_id = $1', [id]);
		res.json('Account Info deleted');
	} catch (error: any) {
		console.log(error.message);
	}
}
export {
	getAllAccounts,
	getAccountById,
	createNewAccount,
	updateAccountById,
	deleteAccountById,
};
