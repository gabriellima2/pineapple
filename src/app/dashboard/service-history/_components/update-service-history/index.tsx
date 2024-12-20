'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
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
import { CustomersSelect } from '@/app/dashboard/_components/customers-select'
import { ServicesSelect } from '@/app/dashboard/_components/services-select'
import { RequiredIndicator } from '@/components/required-indicator'
import { DatePickers } from '@/components/form/date-pickers'
import { UpdateSkeleton } from '@/components/ui/skeleton'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import { useGetServiceHistoryById } from '../../_hooks/queries/use-get-service-history-by-id'
import { useUpdateServiceHistoryForm } from './hooks/use-update-service-history-form'
import { useServiceHistoryContext } from '../../_contexts/service-history.context'

import { currencyMask } from '@/helpers/masks'

type UpdateServiceHistoryProps = {
	serviceHistoryId: string
}

export function UpdateServiceHistory(props: UpdateServiceHistoryProps) {
	const { serviceHistoryId } = props
	const t = useTranslations()
	const { serviceHistory, isLoadingServiceHistory } =
		useGetServiceHistoryById(serviceHistoryId)
	const { form, isUpdating, handleUpdate } =
		useUpdateServiceHistoryForm(serviceHistoryId)
	const { isOpenUpdateServiceHistory, setIsOpenUpdateServiceHistory } =
		useServiceHistoryContext()

	function handleOpenChange(isOpen: boolean) {
		if (isUpdating) return
		setIsOpenUpdateServiceHistory(isOpen)
	}

	useEffect(() => {
		if (!serviceHistory) return
		console.log(serviceHistory.customer_id)
		form.reset({
			charged_amount: serviceHistory.charged_amount
				? currencyMask(serviceHistory.charged_amount)
				: '',
			customer_id: serviceHistory.customer_id,
			service_id: serviceHistory.service_id,
			done_at: serviceHistory.done_at,
			was_paid: serviceHistory.was_paid ? 'true' : 'false',
		})
	}, [serviceHistory, form])

	return (
		<Sheet open={isOpenUpdateServiceHistory} onOpenChange={handleOpenChange}>
			<SheetContent
				disabled={isUpdating}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.service-history.update.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleUpdate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							{isLoadingServiceHistory ? (
								<UpdateSkeleton />
							) : (
								<>
									<FormField
										control={form.control}
										name="customer_id"
										render={({ field }) => (
											<FormItem
												key={field.value}
												className="w-full min-w-[200px]"
											>
												<FormLabel className="text-nowrap">
													{t(
														'dashboard.service-history.update.fields.customer_id'
													)}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<CustomersSelect
														value={field.value}
														onValueChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="service_id"
										render={({ field }) => (
											<FormItem
												key={field.value}
												className="w-full min-w-[200px]"
											>
												<FormLabel className="text-nowrap">
													{t(
														'dashboard.service-history.update.fields.service_id'
													)}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<ServicesSelect
														value={field.value}
														onValueChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="done_at"
										render={({ field }) => (
											<FormItem className="w-full min-w-[200px]">
												<FormLabel className="text-nowrap">
													{t('dashboard.service-history.update.fields.done_at')}
													<RequiredIndicator />
												</FormLabel>
												<DatePickers.Default {...field} />
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="was_paid"
										render={({ field }) => (
											<FormItem
												key={field.value}
												className="w-full min-w-[200px]"
											>
												<FormLabel className="text-nowrap">
													{t(
														'dashboard.service-history.update.fields.was_paid'
													)}
													<RequiredIndicator />
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="true">
															{t('boolean-answer.true')}
														</SelectItem>
														<SelectItem value="false">
															{t('boolean-answer.false')}
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="charged_amount"
										render={({ field }) => (
											<FormItem className="w-full min-w-[200px]">
												<FormLabel className="text-nowrap">
													{t(
														'dashboard.service-history.update.fields.charged_amount'
													)}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<Inputs.Default {...field} mask={currencyMask} />
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
