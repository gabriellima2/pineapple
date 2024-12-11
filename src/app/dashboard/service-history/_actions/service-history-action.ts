/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { convertToNumber } from '@/helpers/currency'
import { ROUTES } from '@/constants/routes'

import type {
	GetServiceHistoryByIdDTO,
	GetAllServiceHistoryDTO,
	GetAllServiceHistoryWithStatusDTO,
	GetServiceHistoryWithStatusByIdDTO,
} from '@/dtos/service-history.dto'
import type { CreateServiceHistoryFields } from '../_hooks/schemas/use-get-create-service-history-intl-schema'
import type { UpdateServiceHistoryFields } from '../_hooks/schemas/use-get-update-service-history-intl-schema'

export async function createServiceHistory(
	payload: CreateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient.from('service_history').insert([
		{
			charged_amount: convertToNumber(payload.charged_amount),
			received_amount: payload.received_amount
				? convertToNumber(payload.received_amount)
				: null,
			done_at: payload.done_at,
			customer_id: payload.customer_id[0].value,
			service_ids: payload.service_id.map((service) => service.value),
		},
	])

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

export async function getAllServiceHistory(): Promise<GetAllServiceHistoryDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history')
		.select(
			'id, charged_amount, received_amount, done_at, customer_id, service_ids'
		)
		.returns<GetAllServiceHistoryDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getAllServiceHistoryWithStatus(): Promise<GetAllServiceHistoryWithStatusDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history_with_status')
		.select(
			'id, charged_amount, received_amount, done_at, customer_id, service_ids, status'
		)
		.returns<GetAllServiceHistoryWithStatusDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getServiceHistoryById(
	serviceHistoryId: string
): Promise<GetServiceHistoryByIdDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history')
		.select(
			'id, charged_amount, received_amount, done_at, customer_id, service_ids, created_at'
		)
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryByIdDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function getServiceHistoryWithStatusById(
	serviceHistoryId: string
): Promise<GetServiceHistoryWithStatusByIdDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history_with_status')
		.select(
			'id, charged_amount, received_amount, done_at, customer_id, service_ids, status, created_at'
		)
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryWithStatusByIdDTO[]>()

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
