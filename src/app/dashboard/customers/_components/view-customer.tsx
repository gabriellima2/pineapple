'use client'

import { useTranslations } from 'next-intl'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { ViewSkeleton } from '@/components/ui/skeleton'
import { Details } from '@/components/details'

import { useGetCustomerById } from '../_hooks/queries/use-get-customer-by-id'
import { useCustomersContext } from '../_contexts/customers.context'
import { useIntlFormatter } from '@/hooks/use-intl-formatter'

type ViewCustomerProps = {
	customerId: string
}

export function ViewCustomer(props: ViewCustomerProps) {
	const { customerId } = props
	const t = useTranslations()
	const { formatDate } = useIntlFormatter()
	const { customer, isLoadingCustomer } = useGetCustomerById(customerId)
	const { isOpenViewCustomer, setIsOpenViewCustomer } = useCustomersContext()
	return (
		<Sheet open={isOpenViewCustomer} onOpenChange={setIsOpenViewCustomer}>
			<SheetContent
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.customers.view.title')}</SheetTitle>
				</SheetHeader>
				<div className="flex-1 p-4">
					{isLoadingCustomer && !customer && <ViewSkeleton />}
					{!isLoadingCustomer && customer && (
						<Details.List>
							<Details.ListItem
								label={t('dashboard.customers.view.fields.id')}
								value={customer.id}
							/>
							<Details.ListItem
								label={t('dashboard.customers.view.fields.name')}
								value={customer.name}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.customers.view.fields.email')}
								value={customer.email}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.customers.view.fields.cell_phone')}
								value={customer.cell_phone}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.customers.view.fields.created_at')}
								value={formatDate(customer.created_at)}
								className="sm:col-span-2"
							/>
						</Details.List>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
