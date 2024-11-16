'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { convertToNumber } from '@/helpers/currency'
import { ROUTES } from '@/constants/routes'

import type {
	CreateServiceFields,
	UpdateServiceFields,
} from '../_schema/service.schema'
import type { GetServiceDTO, GetServicesDTO } from '@/dtos/service.dto'

export async function createService(payload: CreateServiceFields) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	await supabaseClient.from('services').insert([
		{
			name: payload.name,
			description: payload.description || null,
			base_price: convertToNumber(payload.base_price),
		},
	])
	revalidatePath(ROUTES.DASHBOARD.SERVICES())
}

export async function updateService(
	serviceId: string,
	payload: UpdateServiceFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	await supabaseClient
		.from('services')
		.update({
			name: payload.name,
			description: payload.description || null,
			base_price: convertToNumber(payload.base_price),
		})
		.eq('id', serviceId)
	revalidatePath(ROUTES.DASHBOARD.SERVICES())
}

export async function getServices(): Promise<GetServicesDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data } = await supabaseClient
		.from('services')
		.select('id, name, description, base_price')
		.returns<GetServicesDTO>()

	return data
}

export async function getServiceById(
	serviceId: string
): Promise<GetServiceDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data } = await supabaseClient
		.from('services')
		.select('id, name, description, base_price, created_at')
		.eq('id', serviceId)
		.returns<GetServiceDTO[]>()

	return data?.[0] || null
}
