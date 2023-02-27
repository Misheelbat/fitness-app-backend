import express from 'express';
import { authorization } from '../../middleware/authorization';

import {
	getUser,
	createAccountHandler,
	deleteAccountById,
	verifyAccount,
} from './accounts.controller';

import { createAccountSchema } from '../../schema/Account.schema';
import validateResource from '../../middleware/validateResource';

const accountsRouter = express.Router();

declare module 'express-serve-static-core' {
	interface Request {
		account?: string;
	}
}

accountsRouter.get('/', authorization, getUser);
accountsRouter.get('/verify', authorization, verifyAccount);

accountsRouter.post(
	'/register',
	validateResource(createAccountSchema),
	createAccountHandler
);

accountsRouter.delete('/:id', deleteAccountById);

export { accountsRouter };
