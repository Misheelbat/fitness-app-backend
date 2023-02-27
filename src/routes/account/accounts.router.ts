import express from 'express';

import {
	getUserHandler,
	createAccountHandler,
	deleteAccountHandler,
} from './accounts.controller';

import { createAccountSchema } from '../../schema/Account.schema';
import validateResource from '../../middleware/validateResource';
import checkAccount from '../../middleware/checkAccount';

const accountsRouter = express.Router();

accountsRouter.get('/', checkAccount, getUserHandler);
accountsRouter.post(
	'/register',
	validateResource(createAccountSchema),
	createAccountHandler
);
accountsRouter.delete('/:id', deleteAccountHandler);

export { accountsRouter };
