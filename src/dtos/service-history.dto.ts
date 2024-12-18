export type GetAllServiceHistoryWithDetailsDTO = {
	id: string
	charged_amount: number
	was_paid: boolean
	service_id: string
	done_at: string
	customer_id: string
	service: {
		id: string
		name: string
		base_price: number
	}
	customer: {
		id: string
		name: string
		email: string | null
		cell_phone: string | null
	}
}[]

export type GetServiceHistoryWithDetailsByIdDTO = {
	id: string
	charged_amount: number
	was_paid: boolean
	service_id: string
	done_at: string
	customer_id: string
	service: {
		id: string
		name: string
		base_price: number
	}
	customer: {
		id: string
		name: string
		email: string | null
		cell_phone: string | null
	}
	created_at: string
}
