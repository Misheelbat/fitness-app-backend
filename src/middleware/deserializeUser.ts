import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function deserializeUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.header('token');

		if (!token) {
			return next();
		}

		const decoded = jwt.verify(token, process.env.SECRET as Secret);
		if (decoded) {
			res.locals.account = decoded;
		}
		return next();
	} catch (error) {
		return res.status(403).json({ error: 'Not Authorized' });
	}
}

export { deserializeUser };
