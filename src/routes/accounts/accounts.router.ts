import express from 'express';
import {
	getAllAccounts,
	getAccountById,
	createNewAccount,
	updateAccountById,
	deleteAccountById,
} from './accounts.controller';

const accountsRouter = express.Router();

accountsRouter.get('/', getAllAccounts);
accountsRouter.get('/:id', getAccountById);
accountsRouter.post('/register', createNewAccount);
accountsRouter.put('/:id', updateAccountById);
accountsRouter.delete('/:id', deleteAccountById);

export { accountsRouter };
