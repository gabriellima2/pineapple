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

import { useGetServiceHistoryWithDetailsById } from '../_hooks/queries/use-get-service-history-with-details-by-id'
import { useServiceHistoryContext } from '../_contexts/service-history.context'
import { useIntlFormatter } from '@/hooks/use-intl-formatter'

type ViewServiceHistoryProps = {
	serviceHistoryId: string
}

export function ViewServiceHistory(props: ViewServiceHistoryProps) {
	const { serviceHistoryId } = props
	const { formatCurrency, formatDate } = useIntlFormatter()
	const t = useTranslations()
	const { serviceHistory, isLoadingServiceHistory } =
		useGetServiceHistoryWithDetailsById(serviceHistoryId)
	const { isOpenViewServiceHistory, setIsOpenViewServiceHistory } =
		useServiceHistoryContext()
	return (
		<Sheet
			open={isOpenViewServiceHistory}
			onOpenChange={setIsOpenViewServiceHistory}
		>
			<SheetContent
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.view.title')}</SheetTitle>
				</SheetHeader>
				<div className="flex-1 p-4">
					{isLoadingServiceHistory && !serviceHistory && <ViewSkeleton />}
					{!isLoadingServiceHistory && serviceHistory && (
						<article className="space-y-8">
							<Details.List>
								<Details.ListItem
									label={t('dashboard.service-history.view.fields.id')}
									value={serviceHistory.id}
								/>
								<Details.ListItem
									label={t('dashboard.service-history.view.fields.done_at')}
									value={formatDate(serviceHistory.done_at)}
									className="sm:col-span-2"
								/>
								<Details.ListItem
									label={t(
										'dashboard.service-history.view.fields.charged_amount'
									)}
									value={formatCurrency(serviceHistory.charged_amount)}
									className="sm:col-span-2"
								/>
								<Details.ListItem
									label={t('dashboard.service-history.view.fields.was_paid')}
									value={
										serviceHistory.was_paid
											? t('boolean-answer.true')
											: t('boolean-answer.false')
									}
									className="sm:col-span-2"
								/>
								<Details.ListItem
									label={t('dashboard.service-history.view.fields.created_at')}
									value={formatDate(serviceHistory.created_at)}
									className="sm:col-span-2"
								/>
							</Details.List>
							<section className="border-t">
								<h2 className="mb-4 mt-8 text-base font-semibold text-foreground">
									{t(
										'dashboard.service-history.view.fields.service-section.title'
									)}
								</h2>
								<Details.List>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.service-section.id'
										)}
										value={serviceHistory.service.id}
									/>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.service-section.name'
										)}
										value={serviceHistory.service.name}
										className="sm:col-span-2"
									/>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.service-section.base_price'
										)}
										value={formatCurrency(serviceHistory.service.base_price)}
										className="sm:col-span-2"
									/>
									<Details.ListItem
										label={t('dashboard.services.view.fields.description')}
										value={serviceHistory.service.description}
									/>
								</Details.List>
							</section>
							<section className="border-t">
								<h2 className="mb-4 mt-8 text-base font-semibold text-foreground">
									{t(
										'dashboard.service-history.view.fields.customer-section.title'
									)}
								</h2>
								<Details.List>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.customer-section.id'
										)}
										value={serviceHistory.customer.id}
									/>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.customer-section.name'
										)}
										value={serviceHistory.customer.name}
										className="sm:col-span-2"
									/>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.customer-section.email'
										)}
										value={serviceHistory.customer.email}
										className="sm:col-span-2"
									/>
									<Details.ListItem
										label={t(
											'dashboard.service-history.view.fields.customer-section.cell_phone'
										)}
										value={serviceHistory.customer.cell_phone}
										className="sm:col-span-2"
									/>
								</Details.List>
							</section>
						</article>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
