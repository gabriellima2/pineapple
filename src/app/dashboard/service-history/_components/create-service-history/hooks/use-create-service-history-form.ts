import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateServiceHistoryMutation } from '../../../_hooks/mutations/use-create-service-history-mutation'
import { useServiceHistoryContext } from '../../../_contexts/service-history.context'

import {
	useGetCreateServiceHistoryIntlSchema,
	type CreateServiceHistoryFields,
} from '../../../_hooks/schemas/use-get-create-service-history-intl-schema'

export function useCreateServiceHistoryForm() {
	const { closeCreateServiceHistory } = useServiceHistoryContext()
	const { intlSchema } = useGetCreateServiceHistoryIntlSchema()
	const { isCreating, createServiceHistory } = useCreateServiceHistoryMutation({
		onSuccess: closeCreateServiceHistory,
	})
	const form = useForm<CreateServiceHistoryFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			services: [
				{
					charged_amount: '',
					done_at: '',
					was_paid: '',
					customer_id: [],
					service_id: [],
				},
			],
		},
	})

	async function onSubmit(data: CreateServiceHistoryFields) {
		await createServiceHistory(data)
	}

	return {
		form,
		isCreating,
		handleCreate: form.handleSubmit(onSubmit),
	}
}
