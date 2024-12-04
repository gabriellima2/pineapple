import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useServicesContext } from '../../../_contexts/services.context'
import { useToast } from '@/hooks/use-toast'

import { deleteService } from '../../../_actions/service-action'

type UseDeleteServiceParams = {
	serviceId: string
}

export function useDeleteService(params: UseDeleteServiceParams) {
	const { serviceId } = params
	const t = useTranslations('dashboard.services.delete.notification')
	const [isDeleting, setIsDeleting] = useState(false)
	const { closeDeleteService } = useServicesContext()
	const { toast } = useToast()

	async function handleDelete() {
		setIsDeleting(true)
		try {
			await deleteService(serviceId)
			closeDeleteService()
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
