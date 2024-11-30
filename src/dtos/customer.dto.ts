export type GetCustomersDTO = {
	id: string
	name: string
	email: string | null
	phone: string | null
	cell_phone: string | null
}[]

export type GetCustomerDTO = {
	id: string
	name: string
	email: string | null
	phone: string | null
	cell_phone: string | null
	created_at: string
}
