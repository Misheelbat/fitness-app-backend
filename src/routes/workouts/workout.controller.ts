import { Request, Response } from 'express';
import pool from '../../db';

async function getAllWorkouts(req: Request, res: Response) {
	try {
		const allWorkouts = await pool.query('SELECT * FROM workout');
		res.json(allWorkouts.rows);
	} catch (error: any) {
		console.log(error.message);
	}
}
async function getWorkoutById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const workout = await pool.query(
			'SELECT * FROM workout WHERE workout_id = $1',
			[id]
		);
		res.status(200).json(workout.rows);
	} catch (error: any) {
		console.log(error.message);
	}
}
async function createNewWorkout(req: Request, res: Response) {
	try {
		const { w_name, account_id } = req.body;
		const newWorkout = await pool.query(
			'INSERT INTO workout (w_name,account_id) VALUES ($1, $2) ',
			[w_name, account_id]
		);
		res.json(newWorkout);
	} catch (error: any) {
		console.log(error.message);
	}
}

async function updateWorkoutName(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { w_name } = req.body;
		await pool.query('UPDATE workout SET w_name = $1 WHERE workout_id = $2', [
			w_name,
			id,
		]);
		res.status(200).json('updated Workout Name');
	} catch (error: any) {
		console.log(error.message);
	}
}

async function deleteWorkoutById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		await pool.query('DELETE FROM workout WHERE workout_id = $1', [id]);
		res.json('workout Info deleted');
	} catch (error: any) {
		console.log(error.message);
	}
}
export {
	getAllWorkouts,
	getWorkoutById,
	createNewWorkout,
	updateWorkoutName,
	deleteWorkoutById,
};
