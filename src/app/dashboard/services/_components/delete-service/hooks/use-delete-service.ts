import { useState } from 'react'

import { useServicesContext } from '../../../_contexts/services.context'
import { deleteService } from '../../../_actions/service-action'

type UseDeleteServiceParams = {
	serviceId: string
}

export function useDeleteService(params: UseDeleteServiceParams) {
	const { serviceId } = params
	const [isDeleting, setIsDeleting] = useState(false)
	const { closeDeleteService } = useServicesContext()

	async function handleDelete() {
		setIsDeleting(true)
		try {
			await deleteService(serviceId)
			closeDeleteService()
		} catch (_) {
			console.log(_)
		} finally {
			setIsDeleting(false)
		}
	}

	return { isDeleting, handleDelete }
}
