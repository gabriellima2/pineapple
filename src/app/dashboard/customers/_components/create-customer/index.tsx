'use client'

import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useCreateCustomerForm } from './hooks/use-create-customer-form'
import { useCustomersContext } from '../../_contexts/customers.context'

export function CreateService() {
	const t = useTranslations()
	const { form, isCreating, handleCreate } = useCreateCustomerForm()
	const { isOpenCreateCustomer, setIsOpenCreateCustomer } =
		useCustomersContext()

	function handleOpenChange(isOpen: boolean) {
		if (isCreating) return
		form.reset()
		setIsOpenCreateCustomer(isOpen)
	}

	return (
		<Sheet open={isOpenCreateCustomer} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<Button className="flex-1 sm:flex-none">
					{t('actions.create')} <Plus />
				</Button>
			</SheetTrigger>
			<SheetContent
				disabled={isCreating}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.customers.create.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleCreate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4"></div>
						<SheetFooter>
							<SheetClose asChild>
								<Button
									type="button"
									variant="outline"
									className="w-full"
									disabled={isCreating}
								>
									{t('buttons.cancel')}
								</Button>
							</SheetClose>
							<Button type="submit" className="w-full" loading={isCreating}>
								{t('buttons.save')}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
