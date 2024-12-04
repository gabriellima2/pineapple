import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateCustomerMutation } from '../../../_hooks/mutations/use-update-customer-mutation'
import { useCustomersContext } from '../../../_contexts/customers.context'

import {
	useGetUpdateCustomerIntlSchema,
	type UpdateCustomerFields,
} from '../../../_hooks/schemas/use-get-update-customer-intl-schema'

export function useUpdateCustomerForm(serviceId: string) {
	const { closeUpdateCustomer } = useCustomersContext()
	const { intlSchema } = useGetUpdateCustomerIntlSchema()
	const { isUpdating, updateCustomer } = useUpdateCustomerMutation(serviceId, {
		onSuccess: closeUpdateCustomer,
	})
	const form = useForm<UpdateCustomerFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			email: '',
			cell_phone: '',
		},
	})

	async function onSubmit(data: UpdateCustomerFields) {
		await updateCustomer(data)
	}

	return {
		form,
		isUpdating,
		handleUpdate: form.handleSubmit(onSubmit),
	}
}
