import { useFieldArray, useFormContext } from 'react-hook-form'
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
	FormLabel,
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
import { RequiredIndicator } from '@/components/required-indicator'
import { DatePickers } from '@/components/form/date-pickers'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import { currencyMask } from '@/helpers/masks'
import type { CreateServiceHistoryFields } from '../../../_hooks/schemas/use-get-create-service-history-intl-schema'

export function Services() {
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
						<TableHead>Customer</TableHead>
						<TableHead>Service</TableHead>
						<TableHead>Done At</TableHead>
						<TableHead>Was Paid</TableHead>
						<TableHead>Charged Amount</TableHead>
						<TableHead hidden>Actions</TableHead>
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
											<FormLabel className="text-nowrap">
												Customer
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
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.service_id`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
											<FormLabel className="text-nowrap">
												Service
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
							</TableCell>
							<TableCell>
								<FormField
									control={control}
									name={`services.${index}.done_at`}
									render={({ field }) => (
										<FormItem className="w-full min-w-[200px]">
											<FormLabel className="text-nowrap">
												Done At
												<RequiredIndicator />
											</FormLabel>
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
											<FormLabel className="text-nowrap">
												Was paid?
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
													<SelectItem value="true">Yes</SelectItem>
													<SelectItem value="false">No</SelectItem>
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
											<FormLabel className="text-nowrap">
												Charged Amount
												<RequiredIndicator />
											</FormLabel>
											<FormControl>
												<Inputs.Default {...field} mask={currencyMask} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</TableCell>
							<TableCell>
								<Button
									type="button"
									title="Delete row"
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
				Append
			</Button>
		</div>
	)
}
