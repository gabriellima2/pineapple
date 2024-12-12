export type GetAllServiceHistoryDTO = {
	id: string
	charged_amount: number
	was_paid: boolean
	service_id: string
	done_at: string
	customer_id: string
}[]

export type GetServiceHistoryByIdDTO = {
	id: string
	charged_amount: number
	was_paid: boolean
	service_id: string
	done_at: string
	customer_id: string
	created_at: string
}
