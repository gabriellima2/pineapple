/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { ROUTES } from '@/constants/routes'

import type {
	GetServiceHistoryDTO,
	GetAllServiceHistoryDTO,
	GetAllServiceHistoryWithStatusDTO,
	GetServiceHistoryWithStatusDTO,
} from '@/dtos/service-history.dto'
import type { CreateServiceHistoryFields } from '../_hooks/schemas/use-get-create-service-history-intl-schema'
import type { UpdateServiceHistoryFields } from '../_hooks/schemas/use-get-update-service-history-intl-schema'

export async function createServiceHistory(
	payload: CreateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient.from('service_history').insert([{}])

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
		.select('id')
		.returns<GetAllServiceHistoryDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getAllServiceHistoryWithStatus(): Promise<GetAllServiceHistoryWithStatusDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history_with_status')
		.select('id, status')
		.returns<GetAllServiceHistoryDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getServiceHistoryById(
	serviceHistoryId: string
): Promise<GetServiceHistoryDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history')
		.select('id, created_at')
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function getServiceHistoryWithStatusById(
	serviceHistoryId: string
): Promise<GetServiceHistoryWithStatusDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service_history_with_status')
		.select('id, created_at')
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryDTO[]>()

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
