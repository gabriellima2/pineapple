import { useTranslations } from 'next-intl'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useServiceHistoryContext } from '../../_contexts/service-history.context'
import { useDeleteServiceHistory } from './hooks/use-delete-service-history'

type DeleteServiceHistoryProps = {
	serviceHistoryId: string
}

export function DeleteServiceHistory(props: DeleteServiceHistoryProps) {
	const { serviceHistoryId } = props
	const t = useTranslations('dashboard.service-history.delete')
	const { isOpenDeleteServiceHistory, setIsOpenDeleteServiceHistory } =
		useServiceHistoryContext()
	const { isDeleting, handleDelete } = useDeleteServiceHistory({
		serviceHistoryId,
	})

	function handleOpenChange(isOpen: boolean) {
		if (isDeleting) return
		setIsOpenDeleteServiceHistory(isOpen)
	}

	return (
		<AlertDialog
			open={isOpenDeleteServiceHistory}
			onOpenChange={handleOpenChange}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t('title')}</AlertDialogTitle>
					<AlertDialogDescription>{t('description')}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>
						{t('buttons.cancel')}
					</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						isLoading={isDeleting}
						onClick={handleDelete}
					>
						{t('buttons.confirm')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
