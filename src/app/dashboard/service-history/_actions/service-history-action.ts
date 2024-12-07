/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { ROUTES } from '@/constants/routes'

import type {
	GetServiceHistoryDTO,
	GetAllServiceHistoryDTO,
} from '@/dtos/service-history.dto'
import type { CreateServiceHistoryFields } from '../_hooks/schemas/use-get-create-service-history-intl-schema'
import type { UpdateServiceHistoryFields } from '../_hooks/schemas/use-get-update-service-history-intl-schema'

export async function createServiceHistory(
	payload: CreateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient.from('service-history').insert([{}])

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}

export async function updateServiceHistory(
	serviceHistoryId: string,
	payload: UpdateServiceHistoryFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('service-history')
		.update({})
		.eq('id', serviceHistoryId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}

export async function getAllServiceHistory(): Promise<GetAllServiceHistoryDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service-history')
		.select('id')
		.returns<GetAllServiceHistoryDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getServiceHistoryById(
	serviceHistoryId: string
): Promise<GetServiceHistoryDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('service-history')
		.select('id, created_at')
		.eq('id', serviceHistoryId)
		.returns<GetServiceHistoryDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function deleteServiceHistory(serviceHistoryId: string) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('service-history')
		.delete()
		.eq('id', serviceHistoryId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICE_HISTORY())
}
