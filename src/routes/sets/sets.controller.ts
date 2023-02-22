import { Request, Response } from 'express';
import pool from '../../db';

async function getAllSetsInExercises(req: Request, res: Response) {
	try {
		const { ex_id, workout_id } = req.body;
		const allSets = await pool.query(
			'SELECT * FROM sets WHERE ex_id = $1 AND workout_id = $2',
			[ex_id, workout_id]
		);
		res.json(allSets.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

async function getSetsById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const exercise = await pool.query('SELECT * FROM sets WHERE set_id = $1', [
			id,
		]);
		res.status(200).json(exercise.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
async function createNewSet(req: Request, res: Response) {
	try {
		const { s_order, reps, weight, w_unit, r_unit, ex_id, workout_id } =
			req.body;
		const newSets = await pool.query(
			'INSERT INTO sets (s_order, reps, weight, w_unit, r_unit, ex_id, workout_id) VALUES ($1, $2,$3,$4,$5,$6,$7) ',
			[s_order, reps, weight, w_unit, r_unit, ex_id, workout_id]
		);
		res.json(newSets);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

// async function deleteExerciseById(req: Request, res: Response) {
// 	try {
// 		const { ex_id, workout_id } = req.body;
// 		await pool.query(
// 			'DELETE FROM exercise WHERE ex_id = $1 AND workout_id = $2',
// 			[ex_id, workout_id]
// 		);
// 		res.json('exercise deleted');
// 	} catch (err: any) {
// 		return res.status(400).json({
// 			error: err.message,
// 		});
// 	}
// }
export { createNewSet, getAllSetsInExercises, getSetsById };
