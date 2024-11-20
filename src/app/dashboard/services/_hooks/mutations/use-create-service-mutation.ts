import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { createService } from '../../_actions/service-action'
import { MUTATION_KEYS } from '@/constants/keys'

export function useCreateServiceMutation(options?: CustomMutationOptions) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createService,
		mutationKey: [MUTATION_KEYS.CREATE_SERVICE],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.services.create.notification.success.title'),
				description: t(
					'dashboard.services.create.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.services.create.notification.error.title'),
				description: t(
					'dashboard.services.create.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		createService: mutateAsync,
		isCreating: isPending,
	}
}
