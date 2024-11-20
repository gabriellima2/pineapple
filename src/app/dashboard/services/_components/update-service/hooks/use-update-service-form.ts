import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useServicesContext } from '../../../_contexts/services.context'
import { useToast } from '@/hooks/use-toast'

import { updateService } from '../../../_actions/service-action'
import { MUTATION_KEYS } from '@/constants/keys'

import {
	useGetUpdateServiceIntlSchema,
	type UpdateServiceFields,
} from '../../../_hooks/use-get-update-service-intl-schema'

export function useUpdateServiceForm(serviceId: string) {
	const t = useTranslations()
	const { toast } = useToast()
	const { closeUpdateService } = useServicesContext()
	const { intlSchema } = useGetUpdateServiceIntlSchema()

	const form = useForm<UpdateServiceFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: UpdateServiceFields) => updateService(serviceId, data),
		mutationKey: [MUTATION_KEYS.UPDATE_SERVICE],
		onSuccess: () => {
			closeUpdateService()
			toast({
				title: t('dashboard.services.update.notification.success.title'),
				description: t(
					'dashboard.services.update.notification.success.description'
				),
			})
		},
		onError: () => {
			toast({
				title: t('dashboard.services.update.notification.error.title'),
				description: t(
					'dashboard.services.update.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	async function onSubmit(data: UpdateServiceFields) {
		await mutateAsync(data)
	}

	return {
		form,
		isUpdating: isPending,
		handleUpdate: form.handleSubmit(onSubmit),
	}
}
