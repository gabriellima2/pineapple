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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { RequiredIndicator } from '@/components/required-indicator'
import { UpdateSkeleton } from '@/components/ui/skeleton'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

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
		form.reset({
			name: customer.name,
			email: customer.email || '',
			cell_phone: customer.cell_phone || '',
		})
	}, [customer, form])

	return (
		<Sheet open={isOpenUpdateCustomer} onOpenChange={handleOpenChange}>
			<SheetContent
				disabled={isUpdating}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.customers.update.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleUpdate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							{isLoadingCustomer ? (
								<UpdateSkeleton />
							) : (
								<>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t('dashboard.customers.create.fields.name')}{' '}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<Inputs.Default {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t('dashboard.customers.create.fields.email')}
												</FormLabel>
												<FormControl>
													<Inputs.Default type="email" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="cell_phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t('dashboard.customers.create.fields.cell_phone')}
												</FormLabel>
												<FormControl>
													<Inputs.CellPhone {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
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
