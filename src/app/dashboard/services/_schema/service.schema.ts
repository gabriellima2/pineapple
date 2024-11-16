import { z } from 'zod'

export const createServiceSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	description: z.string().optional(),
	base_price: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
})

export const updateServiceSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	description: z.string().optional(),
	base_price: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
})

export type CreateServiceFields = z.infer<typeof createServiceSchema>
export type UpdateServiceFields = z.infer<typeof updateServiceSchema>
