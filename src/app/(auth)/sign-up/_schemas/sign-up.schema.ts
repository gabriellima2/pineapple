import { z } from 'zod'

export const signUpSchema = z.object({
	username: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	email: z
		.string({
			invalid_type_error: 'Formato de email inválido',
			required_error: 'Campo obrigatório',
		})
		.min(1, { message: 'Campo obrigatório' })
		.email({ message: 'Formato de email inválido' }),
	password: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' })
		.refine((password) => password.length >= 8, {
			message: 'A senha deve conter no mínimo 8 caracteres',
		}),
})

export type SignUpFields = z.infer<typeof signUpSchema>
