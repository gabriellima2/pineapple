'use server'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { convertToNumber } from '@/helpers/currency'
import type { CreateServiceFields } from '../schema/create-service.schema'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/constants/routes'

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
