'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { convertToNumber } from '@/helpers/currency'
import { ROUTES } from '@/constants/routes'

import type { CreateServiceFields } from '../_schema/service.schema'
import type { GetServicesDTO } from '@/dtos/service.dto'

export async function createService(payload: CreateServiceFields) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	await supabaseClient.from('services').insert([
		{
			name: payload.name,
			description: payload.description || null,
			base_price: convertToNumber(payload.basePrice),
		},
	])
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
