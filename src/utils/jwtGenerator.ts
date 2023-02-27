import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function signJwt(account_id: string, options?: jwt.SignOptions | undefined) {
	const payload = {
		account: account_id,
	};
	const secret = String(process.env.SECRET);
	return jwt.sign(payload, secret, {
		...(options && options),
		expiresIn: '24hr',
	});
}

export default signJwt;
