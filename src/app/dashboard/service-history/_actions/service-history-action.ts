/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { convertToNumber } from '@/helpers/currency'
import { ROUTES } from '@/constants/routes'

import type {
	GetServiceHistoryWithDetailsByIdDTO,
	GetAllServiceHistoryWithDetailsDTO,
} from '@/dtos/service-history.dto'
import type { CreateServiceHistoryFields } from '../_hooks/schemas/use-get-create-service-history-intl-schema'
import type { UpdateServiceHistoryFields } from '../_hooks/schemas/use-get-update-service-history-intl-schema'

export async function createServiceHistory(
	payload: CreateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const raw = payload.services.map((service) => ({
		charged_amount: convertToNumber(service.charged_amount),
		done_at: service.done_at,
		was_paid: service.was_paid === 'true',
		customer_id: service.customer_id,
		service_id: service.service_id,
	}))
	const { error } = await supabaseClient.from('service_history').insert(raw)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}

export async function updateServiceHistory(
	serviceHistoryId: string,
	payload: UpdateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('service_history')
		.update({})
		.eq('id', serviceHistoryId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}

export async function getAllServiceHistoryWithDetails(): Promise<GetAllServiceHistoryWithDetailsDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history')
		.select(
			`id,
			charged_amount,
			was_paid,
			done_at,
			customer_id,
			service:service_id (id, name, base_price),
			customer:customer_id (id, name, email, cell_phone)`
		)
		.returns<GetAllServiceHistoryWithDetailsDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getServiceHistoryWithDetailsById(
	serviceHistoryId: string
): Promise<GetServiceHistoryWithDetailsByIdDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history')
		.select(
			`id,
			charged_amount,
			was_paid,
			done_at,
			customer_id,
			created_at,
			service:service_id (id, name, base_price, description),
			customer:customer_id (id, name, email, cell_phone)`
		)
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryWithDetailsByIdDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function deleteServiceHistory(serviceHistoryId: string) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('service_history')
		.delete()
		.eq('id', serviceHistoryId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}
