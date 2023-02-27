import { Request, Response, NextFunction } from 'express';

const checkAccount = (req: Request, res: Response, next: NextFunction) => {
	const account = res.locals.account;

	if (!account) {
		return res.sendStatus(403);
	}
	return next();
};
export default checkAccount;
