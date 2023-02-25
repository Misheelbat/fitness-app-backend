import express from 'express';
import { authorization } from '../../middleware/authorization';
import {
	getUser,
	createNewAccount,
	updateAccountById,
	deleteAccountById,
	loginAccount,
	verifyAccount,
} from './accounts.controller';

const accountsRouter = express.Router();

declare module 'express-serve-static-core' {
	interface Request {
		account?: string;
	}
}

accountsRouter.get('/', authorization, getUser);
accountsRouter.get('/verify', authorization, verifyAccount);
accountsRouter.post('/register', createNewAccount);
accountsRouter.post('/login', loginAccount);
accountsRouter.put('/:id', updateAccountById);
accountsRouter.delete('/:id', deleteAccountById);

export { accountsRouter };
