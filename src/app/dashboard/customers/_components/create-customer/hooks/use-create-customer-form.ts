import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateCustomerMutation } from '../../../_hooks/mutations/use-create-customer-mutation'
import { useCustomersContext } from '../../../_contexts/customers.context'

import {
	useGetCreateCustomerIntlSchema,
	type CreateCustomerFields,
} from '../../../_hooks/schemas/use-get-create-customer-intl-schema'

export function useCreateCustomerForm() {
	const { closeCreateCustomer } = useCustomersContext()
	const { intlSchema } = useGetCreateCustomerIntlSchema()
	const { isCreating, createCustomer } = useCreateCustomerMutation({
		onSuccess: closeCreateCustomer,
	})
	const form = useForm<CreateCustomerFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})

	async function onSubmit(data: CreateCustomerFields) {
		await createCustomer(data)
	}

	return {
		form,
		isCreating,
		handleCreate: form.handleSubmit(onSubmit),
	}
}
