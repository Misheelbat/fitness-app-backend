import bcrypt from 'bcrypt';

export const validatePassword = async (
	password: string,
	enteredPassword: string
) => {
	try {
		const validPassword = await bcrypt.compare(password, enteredPassword);
		return validPassword;
	} catch (error) {
		throw new Error('invalid password or email');
	}
};
