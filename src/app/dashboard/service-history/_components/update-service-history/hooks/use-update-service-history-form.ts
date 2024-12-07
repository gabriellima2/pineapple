import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateServiceHistoryMutation } from '../../../_hooks/mutations/use-update-service-history-mutation'
import { useServiceHistoryContext } from '../../../_contexts/service-history.context'

import {
	useGetUpdateServiceHistoryIntlSchema,
	type UpdateServiceHistoryFields,
} from '../../../_hooks/schemas/use-get-update-service-history-intl-schema'

export function useUpdateServiceHistoryForm(serviceHistoryId: string) {
	const { closeUpdateServiceHistory } = useServiceHistoryContext()
	const { intlSchema } = useGetUpdateServiceHistoryIntlSchema()
	const { isUpdating, updateServiceHistory } = useUpdateServiceHistoryMutation(
		serviceHistoryId,
		{ onSuccess: closeUpdateServiceHistory }
	)
	const form = useForm<UpdateServiceHistoryFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {},
	})

	async function onSubmit(data: UpdateServiceHistoryFields) {
		await updateServiceHistory(data)
	}

	return {
		form,
		isUpdating,
		handleUpdate: form.handleSubmit(onSubmit),
	}
}
