import { Request, Response } from 'express';
import pool from '../../db';
import { CreateAccountInput } from '../../schema/Account.schema';
import { createAccountToken } from '../../services/account.service';

async function createAccountHandler(
	req: Request<{}, {}, CreateAccountInput>,
	res: Response
) {
	try {
		const credentials = req.body;
		
		const token = await createAccountToken(credentials);

		res.json({ token });
	} catch (err: any) {
		return res.status(409).json({
			error: err.message,
		});
	}
}
async function verifyAccount(req: Request, res: Response) {
	try {
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


export {
	verifyAccount,
	getUser,
	createAccountHandler,
	deleteAccountById,
};
