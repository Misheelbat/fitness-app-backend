import express from 'express';
import {
	createNewSet,
	getAllSetsInExercises,
	getSetsById,
} from './sets.controller';
const setsRouter = express.Router();

setsRouter.post('/', createNewSet);
setsRouter.get('/', getAllSetsInExercises);
setsRouter.get('/:id', getSetsById);
// setsRouter.delete('/', deleteExerciseById);
// setsRouter.put('/:id', updateWorkoutName);

export { setsRouter, getSetsById };
