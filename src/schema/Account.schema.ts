import { z, TypeOf, object } from 'zod';

const createAccountSchema = z.object({
	body: object({
		name: z.string({ required_error: 'name is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Must be 6 or more characters long' }),
		passwordConfirm: z
			.string()
			.min(6, { message: 'Must be 6 or more characters long' }),
	}).refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords don not match',
		path: ['passwordConfirm'],
	}),
});

type CreateAccountInput = TypeOf<typeof createAccountSchema>['body'];

export { createAccountSchema, CreateAccountInput };
