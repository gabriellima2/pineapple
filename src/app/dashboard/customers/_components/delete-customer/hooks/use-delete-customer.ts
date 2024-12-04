import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useCustomersContext } from '../../../_contexts/customers.context'
import { useToast } from '@/hooks/use-toast'

import { deleteCustomer } from '../../../_actions/customer-action'

type UseDeleteCustomerParams = {
	customerId: string
}

export function useDeleteCustomer(params: UseDeleteCustomerParams) {
	const { customerId } = params
	const t = useTranslations('dashboard.customers.delete.notification')
	const [isDeleting, setIsDeleting] = useState(false)
	const { closeDeleteCustomer } = useCustomersContext()
	const { toast } = useToast()

	async function handleDelete() {
		setIsDeleting(true)
		try {
			await deleteCustomer(customerId)
			closeDeleteCustomer()
			toast({
				title: t('success.title'),
				description: t('success.description'),
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			toast({ title: t('error.title'), description: t('error.description') })
		} finally {
			setIsDeleting(false)
		}
	}

	return { isDeleting, handleDelete }
}
