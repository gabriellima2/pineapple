import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { updateService } from '../../_actions/service-action'
import { MUTATION_KEYS } from '@/constants/keys'

import type { UpdateServiceFields } from '../schemas/use-get-update-service-intl-schema'

export function useUpdateServiceMutation(
	serviceId: string,
	options?: CustomMutationOptions
) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: UpdateServiceFields) => updateService(serviceId, data),
		mutationKey: [MUTATION_KEYS.UPDATE_SERVICE],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.services.update.notification.success.title'),
				description: t(
					'dashboard.services.update.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.services.update.notification.error.title'),
				description: t(
					'dashboard.services.update.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		updateService: mutateAsync,
		isUpdating: isPending,
	}
}
