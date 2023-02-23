import express from 'express';
import {
	createNewSession,
	getAllSessionsByAccount,
	getSessionById,
	deleteSessionId,
} from './session.controller';

const sessionRouter = express.Router();

sessionRouter.get('/', getAllSessionsByAccount);
sessionRouter.get('/:id', getSessionById);
sessionRouter.post('/', createNewSession);
sessionRouter.delete('/:id', deleteSessionId);

export { sessionRouter };
