import { Request, Response } from 'express';
import pool from '../../db';

async function getAllSessionsByAccount(req: Request, res: Response) {
	try {
		const { account_id } = req.body;
		const allSessions = await pool.query(
			'SELECT * FROM session WHERE account_id = $1',
			[account_id]
		);
		res.json(allSessions.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

async function getSessionById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const session = await pool.query(
			'SELECT * FROM session WHERE session_id = $1',
			[id]
		);
		res.status(200).json(session.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
async function createNewSession(req: Request, res: Response) {
	try {
		const { session_date, account_id, workout_id } = req.body;
		const newSession = await pool.query(
			'INSERT INTO session (session_date, account_id, workout_id) VALUES ($1, $2, $3) ',
			[session_date, account_id, workout_id]
		);
		res.json(newSession);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

async function deleteSessionId(req: Request, res: Response) {
	try {
		const { id } = req.params;
		await pool.query('DELETE FROM session WHERE session_id = $1', [id]);
		res.json('session deleted');
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
export {
	createNewSession,
	getAllSessionsByAccount,
	getSessionById,
	deleteSessionId,
};
