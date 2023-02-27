import express from 'express';

import { createLoginHandler } from './login.controller';
import validateResource from '../../middleware/validateResource';
import { createLoginSchema } from '../../schema/login.schema';

const authRouter = express.Router();

authRouter.post(
	'/login',
	validateResource(createLoginSchema),
	createLoginHandler
);

export { authRouter };
