export type GetAllServicesDTO = {
	id: string
	name: string
	description: string | null
	base_price: number
}[]

export type GetServiceByIdDTO = {
	id: string
	name: string
	description: string | null
	base_price: number
	created_at: string
}
