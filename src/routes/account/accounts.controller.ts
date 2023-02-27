import { Request, Response } from 'express';
import pool from '../../db';
import { CreateAccountInput } from '../../schema/Account.schema';
import {
	createAccountToken,
	findAccountById,
	deleteAccountById,
} from '../../services/account.service';

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
async function getUserHandler(req: Request, res: Response) {
	try {
		const accountId = res.locals.account;

		const accountData = await findAccountById(accountId.id);

		res.status(200).json(accountData.rows[0]);
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

async function deleteAccountHandler(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const deleted = await deleteAccountById(id);
		
		res.json(deleted);
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}

export { getUserHandler, createAccountHandler, deleteAccountHandler };
