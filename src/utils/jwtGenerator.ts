import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function jwtGenerator(account_id: string) {
	const payload = {
		account: account_id,
	};
	const secret = String(process.env.SECRET);
	return jwt.sign(payload, secret, { expiresIn: '24hr' });
}

export { jwtGenerator };
