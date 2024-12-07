export type GetAllCustomersDTO = {
	id: string
	name: string
	email: string | null
	cell_phone: string | null
}[]

export type GetCustomerByIdDTO = {
	id: string
	name: string
	email: string | null
	cell_phone: string | null
	created_at: string
}
