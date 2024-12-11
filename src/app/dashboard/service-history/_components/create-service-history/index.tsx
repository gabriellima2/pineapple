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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { CustomersSearchableSelect } from '@/app/dashboard/_components/customers-searchable-select'
import { ServicesMultiSelect } from '@/app/dashboard/_components/services-multi-select'
import { RequiredIndicator } from '@/components/required-indicator'
import { DatePickers } from '@/components/form/date-pickers'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import { useCreateServiceHistoryForm } from './hooks/use-create-service-history-form'
import { useServiceHistoryContext } from '../../_contexts/service-history.context'

import { currencyMask } from '@/helpers/masks'

export function CreateService() {
	const t = useTranslations()
	const { form, isCreating, handleCreate } = useCreateServiceHistoryForm()
	const { isOpenCreateServiceHistory, setIsOpenCreateServiceHistory } =
		useServiceHistoryContext()

	function handleOpenChange(isOpen: boolean) {
		if (isCreating) return
		form.reset()
		setIsOpenCreateServiceHistory(isOpen)
	}

	return (
		<Sheet open={isOpenCreateServiceHistory} onOpenChange={handleOpenChange}>
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
					<SheetTitle>{t('dashboard.service-history.create.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleCreate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							<FormField
								control={form.control}
								name="charged_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t(
												'dashboard.service-history.create.fields.charged_amount'
											)}{' '}
											<RequiredIndicator />
										</FormLabel>
										<FormControl>
											<Inputs.Default {...field} mask={currencyMask} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="received_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t(
												'dashboard.service-history.create.fields.received_amount'
											)}{' '}
										</FormLabel>
										<FormControl>
											<Inputs.Default {...field} mask={currencyMask} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="done_at"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('dashboard.service-history.create.fields.done_at')}{' '}
											<RequiredIndicator />
										</FormLabel>
										<DatePickers.Default {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="service_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={field.name}>
											{t('dashboard.service-history.create.fields.service_id')}{' '}
											<RequiredIndicator />
										</FormLabel>
										<FormControl>
											<ServicesMultiSelect
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="customer_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('dashboard.service-history.create.fields.customer_id')}{' '}
											<RequiredIndicator />
										</FormLabel>
										<FormControl>
											<CustomersSearchableSelect
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
