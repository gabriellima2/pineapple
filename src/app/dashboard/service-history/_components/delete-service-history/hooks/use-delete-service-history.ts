import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useServiceHistoryContext } from '../../../_contexts/service-history.context'
import { useToast } from '@/hooks/use-toast'

import { deleteServiceHistory } from '../../../_actions/service-history-action'

type UseDeleteServiceHistoryParams = {
	serviceHistoryId: string
}

export function useDeleteServiceHistory(params: UseDeleteServiceHistoryParams) {
	const { serviceHistoryId } = params
	const t = useTranslations('dashboard.service-history.delete.notification')
	const [isDeleting, setIsDeleting] = useState(false)
	const { closeDeleteServiceHistory } = useServiceHistoryContext()
	const { toast } = useToast()

	async function handleDelete() {
		setIsDeleting(true)
		try {
			await deleteServiceHistory(serviceHistoryId)
			closeDeleteServiceHistory()
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
