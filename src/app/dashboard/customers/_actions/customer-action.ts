'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { ROUTES } from '@/constants/routes'

import type { CreateCustomerFields } from '../_hooks/schemas/use-get-create-customer-intl-schema'
import type { UpdateCustomerFields } from '../_hooks/schemas/use-get-update-customer-intl-schema'
import type { GetCustomerDTO, GetCustomersDTO } from '@/dtos/customer.dto'

export async function createCustomer(payload: CreateCustomerFields) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient.from('customers').insert([
		{
			name: payload.name,
			email: payload.email || null,
			cell_phone: payload.cell_phone || null,
		},
	])

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.CUSTOMERS())
}

export async function updateCustomer(
	customerId: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	payload: UpdateCustomerFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('customers')
		.update({})
		.eq('id', customerId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.CUSTOMERS())
}

export async function getCustomers(): Promise<GetCustomersDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('customers')
		.select('id, name, email, cell_phone')
		.returns<GetCustomersDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getCustomerById(
	customerId: string
): Promise<GetCustomerDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('customers')
		.select('id')
		.eq('id', customerId)
		.returns<GetCustomerDTO[]>()

	if (error) throw new InternalServerErrorException()
	return data?.[0] || null
}

export async function deleteCustomer(customerId: string) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('customers')
		.delete()
		.eq('id', customerId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.CUSTOMERS())
}
