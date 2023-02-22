import express from 'express';
import {
	getAllExercisesInWorkout,
	getExerciseById,
	createNewExercise,
} from './exercise.controller';
const exerciseRouter = express.Router();

exerciseRouter.get('/', getExerciseById);
exerciseRouter.get('/:id', getAllExercisesInWorkout);
exerciseRouter.post('/', createNewExercise);
// exerciseRouter.put('/:id', updateWorkoutName);
// exerciseRouter.delete('/:id', deleteWorkoutById);

export { exerciseRouter };
