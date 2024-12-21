import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Trash2 } from 'lucide-react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CustomersSelect } from '@/app/dashboard/_components/customers-select'
import { ServicesSelect } from '@/app/dashboard/_components/services-select'
import { DatePickers } from '@/components/form/date-pickers'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import type { CreateServiceHistoryFields } from '../../../_hooks/schemas/use-get-create-service-history-intl-schema'

export function Services() {
	const t = useTranslations()
	const { control } = useFormContext<CreateServiceHistoryFields>()
	const {
		fields: services,
		append: appendService,
		remove,
	} = useFieldArray({
		control,
		name: 'services',
	})

	function handleAppendService() {
		appendService({
			charged_amount: '',
			done_at: '',
			was_paid: '',
			customer_id: '',
			service_id: '',
		})
	}

	return (
		<div className="mb-4 flex flex-col items-end gap-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							{t('dashboard.service-history.create.fields.customer_id')}
						</TableHead>
						<TableHead>
							{t('dashboard.service-history.create.fields.service_id')}
						</TableHead>
						<TableHead>
							{t('dashboard.service-history.create.fields.done_at')}
						</TableHead>
						<TableHead>
							{t('dashboard.service-history.create.fields.was_paid')}
						</TableHead>
						<TableHead>
							{t('dashboard.service-history.create.fields.charged_amount')}
						</TableHead>
						<TableHead hidden>{t('actions.title')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{services.map((service, index) => (
						<TableRow key={service.id}>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.customer_id`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
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
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.service_id`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
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
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.done_at`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
											<DatePickers.Default {...field} />
											<FormMessage />
										</FormItem>
									)}
								/>
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.was_paid`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
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
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.charged_amount`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
											<FormControl>
												<Inputs.Currency {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</TableCell>
							<TableCell>
								<Button
									type="button"
									title={t('actions.delete-row')}
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.preventDefault()
										remove(index)
									}}
								>
									<Trash2 className="text-destructive" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Button
				type="button"
				variant="outline"
				onClick={(e) => {
					e.preventDefault()
					handleAppendService()
				}}
			>
				{t('actions.append-row')}
			</Button>
		</div>
	)
}
