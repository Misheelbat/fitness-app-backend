import express from 'express';
import {
	getAllExercisesInWorkout,
	getExerciseById,
	createNewExercise,
	deleteExerciseById,
} from './exercise.controller';
const exerciseRouter = express.Router();

exerciseRouter.get('/', getExerciseById);
exerciseRouter.get('/:id', getAllExercisesInWorkout);
exerciseRouter.post('/', createNewExercise);
exerciseRouter.delete('/', deleteExerciseById);
// exerciseRouter.put('/:id', updateWorkoutName);

export { exerciseRouter };
