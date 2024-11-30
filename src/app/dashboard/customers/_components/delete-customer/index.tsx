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

import { useCustomersContext } from '../../_contexts/customers.context'
import { useDeleteCustomer } from './hooks/use-delete-customer'

type DeleteCustomerProps = {
	customerId: string
}

export function DeleteCustomer(props: DeleteCustomerProps) {
	const { customerId } = props
	const t = useTranslations('dashboard.services.delete')
	const { isDeleting, handleDelete } = useDeleteCustomer({ customerId })
	const { isOpenDeleteCustomer, setIsOpenDeleteCustomer } =
		useCustomersContext()

	function handleOpenChange(isOpen: boolean) {
		if (isDeleting) return
		setIsOpenDeleteCustomer(isOpen)
	}

	return (
		<AlertDialog open={isOpenDeleteCustomer} onOpenChange={handleOpenChange}>
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
