import { z } from 'zod';

const Account = z
	.object({
		name: z.string(),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Must be 6 or more characters long' }),
		passwordConfirm: z
			.string()
			.min(6, { message: 'Must be 6 or more characters long' }),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm'],
	});

export { Account };
