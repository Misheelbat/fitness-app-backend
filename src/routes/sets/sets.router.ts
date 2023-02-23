import express from 'express';
import {
	createNewSet,
	getAllSetsInExercise,
	getSetsById,
	deleteSetById,
	updateSetData,
} from './sets.controller';
const setsRouter = express.Router();

setsRouter.post('/', createNewSet);
setsRouter.get('/', getAllSetsInExercise);
setsRouter.get('/:id', getSetsById);
setsRouter.delete('/:id', deleteSetById);
setsRouter.put('/:id', updateSetData);

export { setsRouter };
