export type GetServicesDTO = {
	id: string
	name: string
	description: string | null
	base_price: number
}[]

export type GetServiceDTO = {
	id: string
	name: string
	description: string | null
	base_price: number
	created_at: string
}
