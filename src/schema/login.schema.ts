import { z, TypeOf, object } from 'zod';

const createLoginSchema = z.object({
	body: object({
		email: z
			.string({ required_error: 'Invalid email or password' })
			.email({ message: 'Invalid email address' }),
		password: z
			.string({ required_error: 'password is required' })
			.min(6, { message: 'Invalid email or password' }),
	}),
});

type CreateLoginInput = TypeOf<typeof createLoginSchema>['body'];
export { createLoginSchema, CreateLoginInput };
