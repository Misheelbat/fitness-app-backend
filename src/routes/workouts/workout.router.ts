import express from 'express';
import {
	getAllWorkouts,
	getWorkoutById,
	createNewWorkout,
	updateWorkoutName,
	deleteWorkoutById,
} from './workout.controller';
const workoutsRouter = express.Router();

workoutsRouter.get('/', getAllWorkouts);
workoutsRouter.get('/:id', getWorkoutById);
workoutsRouter.post('/', createNewWorkout);
workoutsRouter.put('/:id', updateWorkoutName);
workoutsRouter.delete('/:id', deleteWorkoutById);

export { workoutsRouter };
