import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { createCustomer } from '../../_actions/customer-action'
import { MUTATION_KEYS } from '@/constants/keys'

export function useCreateCustomerMutation(options?: CustomMutationOptions) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createCustomer,
		mutationKey: [MUTATION_KEYS.CREATE_CUSTOMER],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.customers.create.notification.success.title'),
				description: t(
					'dashboard.customers.create.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.customers.create.notification.error.title'),
				description: t(
					'dashboard.customers.create.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		createCustomer: mutateAsync,
		isCreating: isPending,
	}
}
