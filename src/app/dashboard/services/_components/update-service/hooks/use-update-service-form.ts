import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateServiceMutation } from '../../../_hooks/mutations/use-update-service-mutation'
import { useServicesContext } from '../../../_contexts/services.context'

import {
	useGetUpdateServiceIntlSchema,
	type UpdateServiceFields,
} from '../../../_hooks/schemas/use-get-update-service-intl-schema'

export function useUpdateServiceForm(serviceId: string) {
	const { closeUpdateService } = useServicesContext()
	const { intlSchema } = useGetUpdateServiceIntlSchema()
	const { isUpdating, updateService } = useUpdateServiceMutation(serviceId, {
		onSuccess: closeUpdateService,
	})
	const form = useForm<UpdateServiceFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})

	async function onSubmit(data: UpdateServiceFields) {
		await updateService(data)
	}

	return {
		form,
		isUpdating,
		handleUpdate: form.handleSubmit(onSubmit),
	}
}
