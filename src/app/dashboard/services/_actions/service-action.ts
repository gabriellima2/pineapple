'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { convertToNumber } from '@/helpers/currency'
import { ROUTES } from '@/constants/routes'

import type { CreateServiceFields } from '../_hooks/schemas/use-get-create-service-intl-schema'
import type { UpdateServiceFields } from '../_hooks/schemas/use-get-update-service-intl-schema'
import type { GetServiceDTO, GetServicesDTO } from '@/dtos/service.dto'

export async function createService(payload: CreateServiceFields) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient.from('services').insert([
		{
			name: payload.name,
			description: payload.description || null,
			base_price: convertToNumber(payload.base_price),
		},
	])

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICES())
}

export async function updateService(
	serviceId: string,
	payload: UpdateServiceFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('services')
		.update({
			name: payload.name,
			description: payload.description || null,
			base_price: convertToNumber(payload.base_price),
		})
		.eq('id', serviceId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICES())
}

export async function getServices(): Promise<GetServicesDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('services')
		.select('id, name, description, base_price')
		.returns<GetServicesDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getServiceById(
	serviceId: string
): Promise<GetServiceDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('services')
		.select('id, name, description, base_price, created_at')
		.eq('id', serviceId)
		.returns<GetServiceDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function deleteService(serviceId: string) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('services')
		.delete()
		.eq('id', serviceId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.SERVICES())
}
