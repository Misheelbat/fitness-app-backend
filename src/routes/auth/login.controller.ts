import { Request, Response } from 'express';
import { CreateLoginInput } from '../../schema/login.schema';
import { findAccountByEmail } from '../../services/account.service';
import { validatePassword } from '../../utils/validatePassword';
import signJwt from '../../utils/jwtGenerator';

export async function createLoginHandler(
	req: Request<{}, {}, CreateLoginInput>,
	res: Response
) {
	const ErrorMSg = 'Password or Email is incorrect';
	try {
		const { email, password } = req.body;
		const userExist = await findAccountByEmail(email);

		if (userExist.rows.length === 0) {
			return res.json({
				error: ErrorMSg,
			});
		}
		const validPassword = await validatePassword(
			password,
			userExist.rows[0].password
		);

		if (!validPassword) {
			return res.status(401).json({
				error: ErrorMSg,
			});
		}
		const token = signJwt(userExist.rows[0].account_id);
		res.status(200).json({ token });
	} catch (err: any) {
		return res.status(500).json({
			error: err.message,
		});
	}
}
