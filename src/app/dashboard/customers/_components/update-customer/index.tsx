'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { UpdateSkeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useGetCustomerById } from '../../_hooks/queries/use-get-customer-by-id'
import { useUpdateCustomerForm } from './hooks/use-update-customer-form'
import { useCustomersContext } from '../../_contexts/customers.context'

type UpdateCustomerProps = {
	customerId: string
}

export function UpdateCustomer(props: UpdateCustomerProps) {
	const { customerId } = props
	const t = useTranslations()
	const { customer, isLoadingCustomer } = useGetCustomerById(customerId)
	const { form, isUpdating, handleUpdate } = useUpdateCustomerForm(customerId)
	const { isOpenUpdateCustomer, setIsOpenUpdateCustomer } =
		useCustomersContext()

	function handleOpenChange(isOpen: boolean) {
		if (isUpdating) return
		form.reset()
		setIsOpenUpdateCustomer(isOpen)
	}

	useEffect(() => {
		if (!customer) return
		form.reset({})
	}, [customer, form])

	return (
		<Sheet open={isOpenUpdateCustomer} onOpenChange={handleOpenChange}>
			<SheetContent
				disabled={isUpdating}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.update.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleUpdate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							{isLoadingCustomer ? <UpdateSkeleton /> : <></>}
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button
									type="button"
									variant="outline"
									className="w-full"
									disabled={isUpdating}
								>
									{t('buttons.cancel')}
								</Button>
							</SheetClose>
							<Button type="submit" className="w-full" loading={isUpdating}>
								{t('buttons.save')}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
