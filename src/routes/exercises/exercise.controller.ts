import { Request, Response } from 'express';
import pool from '../../db';

async function getAllExercisesInWorkout(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const allExercises = await pool.query(
			'SELECT * FROM exercise WHERE workout_id = $1',
			[id]
		);
		res.json(allExercises.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
async function getExerciseById(req: Request, res: Response) {
	try {
		const { ex_id, workout_id } = req.body;
		const exercise = await pool.query(
			'SELECT * FROM exercise WHERE ex_id = $1 AND workout_id = $2',
			[ex_id, workout_id]
		);
		res.status(200).json(exercise.rows);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
async function createNewExercise(req: Request, res: Response) {
	try {
		const { ex_id, ex_name, workout_id } = req.body;
		const newExercise = await pool.query(
			'INSERT INTO exercise (ex_id, ex_name, workout_id) VALUES ($1, $2,$3) ',
			[ex_id, ex_name, workout_id]
		);
		res.json(newExercise);
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}

// async function updateWorkoutName(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params;
// 		const { w_name } = req.body;
// 		await pool.query('UPDATE workout SET w_name = $1 WHERE workout_id = $2', [
// 			w_name,
// 			id,
// 		]);
// 		res.status(200).json('updated Workout Name');
// 	} catch (err: any) {
// 		return res.status(400).json({
// 			error: err.message,
// 		});
// 	}
// }

async function deleteExerciseById(req: Request, res: Response) {
	try {
		const { ex_id, workout_id } = req.body;
		await pool.query(
			'DELETE FROM exercise WHERE ex_id = $1 AND workout_id = $2',
			[ex_id, workout_id]
		);
		res.json('exercise deleted');
	} catch (err: any) {
		return res.status(400).json({
			error: err.message,
		});
	}
}
export {
	getAllExercisesInWorkout,
	getExerciseById,
	createNewExercise,
	deleteExerciseById,
};
