import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useToast } from '@/hooks/use-toast'

import { updateCustomer } from '../../_actions/customer-action'
import { MUTATION_KEYS } from '@/constants/keys'

import type { UpdateCustomerFields } from '../schemas/use-get-update-customer-intl-schema'

export function useUpdateCustomerMutation(
	serviceId: string,
	options?: CustomMutationOptions
) {
	const t = useTranslations()
	const { toast } = useToast()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: UpdateCustomerFields) => updateCustomer(serviceId, data),
		mutationKey: [MUTATION_KEYS.UPDATE_CUSTOMER],
		onSuccess: async () => {
			await options?.onSuccess?.()
			toast({
				title: t('dashboard.customers.update.notification.success.title'),
				description: t(
					'dashboard.customers.update.notification.success.description'
				),
			})
		},
		onError: (error) => {
			options?.onError?.(error)
			toast({
				title: t('dashboard.customers.update.notification.error.title'),
				description: t(
					'dashboard.customers.update.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	return {
		updateCustomer: mutateAsync,
		isUpdating: isPending,
	}
}
