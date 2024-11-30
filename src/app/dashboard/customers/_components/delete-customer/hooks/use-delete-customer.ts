import { useState } from 'react'

import { useCustomersContext } from '../../../_contexts/customers.context'
import { deleteCustomer } from '../../../_actions/customer-action'

type UseDeleteCustomerParams = {
	customerId: string
}

export function useDeleteCustomer(params: UseDeleteCustomerParams) {
	const { customerId } = params
	const [isDeleting, setIsDeleting] = useState(false)
	const { closeDeleteCustomer } = useCustomersContext()

	async function handleDelete() {
		setIsDeleting(true)
		try {
			await deleteCustomer(customerId)
			closeDeleteCustomer()
		} catch (_) {
			console.log(_)
		} finally {
			setIsDeleting(false)
		}
	}

	return { isDeleting, handleDelete }
}
