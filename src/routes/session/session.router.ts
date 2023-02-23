import express from 'express';
import {
	getSessionById,
	deleteSessionId,
	createNewSession,
	getAllSessionsByAccount,
} from './session.controller';

const sessionRouter = express.Router();

sessionRouter.get('/', getAllSessionsByAccount);
sessionRouter.get('/:id', getSessionById);
sessionRouter.post('/', createNewSession);
sessionRouter.delete('/:id', deleteSessionId);

export { sessionRouter };
