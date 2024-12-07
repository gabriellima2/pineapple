import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { createServiceHistory } from '../../_actions/service-history-action'
import { MUTATION_KEYS } from '@/constants/keys'

export function useCreateServiceHistoryMutation(
	options?: CustomMutationOptions
) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createServiceHistory,
		mutationKey: [MUTATION_KEYS.CREATE_SERVICE_HISTORY],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.service-history.create.notification.success.title'),
				description: t(
					'dashboard.service-history.create.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.service-history.create.notification.error.title'),
				description: t(
					'dashboard.service-history.create.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		createServiceHistory: mutateAsync,
		isCreating: isPending,
	}
}
