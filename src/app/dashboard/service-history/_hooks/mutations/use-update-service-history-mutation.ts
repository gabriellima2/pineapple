import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { updateServiceHistory } from '../../_actions/service-history-action'
import { MUTATION_KEYS } from '@/constants/keys'

import type { UpdateServiceHistoryFields } from '../schemas/use-get-update-service-history-intl-schema'

export function useUpdateServiceHistoryMutation(
	serviceId: string,
	options?: CustomMutationOptions
) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: UpdateServiceHistoryFields) =>
			updateServiceHistory(serviceId, data),
		mutationKey: [MUTATION_KEYS.UPDATE_SERVICE_HISTORY],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.service-history.update.notification.success.title'),
				description: t(
					'dashboard.service-history.update.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.service-history.update.notification.error.title'),
				description: t(
					'dashboard.service-history.update.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		updateServiceHistory: mutateAsync,
		isUpdating: isPending,
	}
}
