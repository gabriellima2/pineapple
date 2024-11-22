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

import { useServicesContext } from '../../_contexts/services.context'
import { useDeleteService } from './hooks/use-delete-service'
import { useTranslations } from 'next-intl'

type DeleteServiceProps = {
	serviceId: string
}

export function DeleteService(props: DeleteServiceProps) {
	const { serviceId } = props
	const t = useTranslations('dashboard.services.delete')
	const { isOpenDeleteService, setIsOpenDeleteService } = useServicesContext()
	const { isDeleting, handleDelete } = useDeleteService({ serviceId })

	function handleOpenChange(isOpen: boolean) {
		if (isDeleting) return
		setIsOpenDeleteService(isOpen)
	}

	return (
		<AlertDialog open={isOpenDeleteService} onOpenChange={handleOpenChange}>
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
