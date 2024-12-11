export type ServiceHistoryStatus =
	| 'not_paid'
	| 'paid'
	| 'paid_partially'
	| 'unknown'

export type GetAllServiceHistoryDTO = {
	id: string
	charged_amount: number
	received_amount: number | null
	done_at: string
	customer_id: string
	service_ids: string[]
}[]

export type GetServiceHistoryByIdDTO = {
	id: string
	charged_amount: number
	received_amount: number | null
	done_at: string
	customer_id: string
	service_ids: string[]
	created_at: string
}

export type GetAllServiceHistoryWithStatusDTO = {
	id: string
	charged_amount: number
	received_amount: number | null
	done_at: string
	customer_id: string
	service_ids: string[]
	status: ServiceHistoryStatus
}[]

export type GetServiceHistoryWithStatusByIdDTO = {
	id: string
	charged_amount: number
	received_amount: number | null
	done_at: string
	customer_id: string
	service_ids: string[]
	status: ServiceHistoryStatus
	created_at: string
}
