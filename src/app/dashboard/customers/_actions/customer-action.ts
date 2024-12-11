'use server'

import { revalidatePath } from 'next/cache'

import { createClerkSupabaseClientSsr } from '@/lib/supabase/create-clerk-supabase-client-ssr'

import { InternalServerErrorException } from '@/exceptions/interval-server-error.exception'
import { ROUTES } from '@/constants/routes'

import type {
	GetCustomerOptionsDTO,
	GetCustomerByIdDTO,
	GetAllCustomersDTO,
} from '@/dtos/customer.dto'
import type { CreateCustomerFields } from '../_hooks/schemas/use-get-create-customer-intl-schema'
import type { UpdateCustomerFields } from '../_hooks/schemas/use-get-update-customer-intl-schema'

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
	payload: UpdateCustomerFields
) {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { error } = await supabaseClient
		.from('customers')
		.update({
			name: payload.name,
			email: payload.email || null,
			cell_phone: payload.cell_phone || null,
		})
		.eq('id', customerId)

	if (error) throw new InternalServerErrorException()
	revalidatePath(ROUTES.DASHBOARD.CUSTOMERS())
}

export async function getAllCustomers(): Promise<GetAllCustomersDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('customers')
		.select('id, name, email, cell_phone')
		.returns<GetAllCustomersDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}

export async function getCustomerById(
	customerId: string
): Promise<GetCustomerByIdDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('customers')
		.select('id, name, email, cell_phone, created_at')
		.eq('id', customerId)
		.returns<GetCustomerByIdDTO[]>()

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

export async function getCustomerOptions(): Promise<GetCustomerOptionsDTO | null> {
	const supabaseClient = await createClerkSupabaseClientSsr()
	const { data, error } = await supabaseClient
		.from('customers')
		.select('id, name')
		.returns<GetCustomerOptionsDTO>()

	if (error) throw new InternalServerErrorException()
	return data
}
