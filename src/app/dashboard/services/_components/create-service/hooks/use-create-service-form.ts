import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateServiceMutation } from '../../../_hooks/mutations/use-create-service-mutation'
import { useServicesContext } from '../../../_contexts/services.context'

import {
	useGetCreateServiceIntlSchema,
	type CreateServiceFields,
} from '../../../_hooks/schemas/use-get-create-service-intl-schema'

export function useCreateServiceForm() {
	const { closeCreateService } = useServicesContext()
	const { intlSchema } = useGetCreateServiceIntlSchema()
	const { isCreating, createService } = useCreateServiceMutation({
		onSuccess: closeCreateService,
	})
	const form = useForm<CreateServiceFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})

	async function onSubmit(data: CreateServiceFields) {
		await createService(data)
	}

	return {
		form,
		isCreating,
		handleCreate: form.handleSubmit(onSubmit),
	}
}
