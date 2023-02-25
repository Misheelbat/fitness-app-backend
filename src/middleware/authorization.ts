import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface CustomJwtPayload extends JwtPayload {
	account: string;
}

async function authorization(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.header('token');

		if (!token) {
			res.status(403).json({ error: 'Not Authorized' });
		}

		const payload = jwt.verify(
			token as string,
			process.env.SECRET as Secret
		) as CustomJwtPayload;

		req.account = payload.account;
		next();
	} catch (error) {
		return res.status(403).json({ error: 'Not Authorized' });
	}
}

export { authorization };
