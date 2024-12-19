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

import { useGetServiceById } from '../_hooks/queries/use-get-service-by-id'
import { useServicesContext } from '../_contexts/services.context'
import { useIntlFormatter } from '@/hooks/use-intl-formatter'

type ViewServiceProps = {
	serviceId: string
}

export function ViewService(props: ViewServiceProps) {
	const { serviceId } = props
	const t = useTranslations()
	const { formatCurrency, formatDate } = useIntlFormatter()
	const { service, isLoadingService } = useGetServiceById(serviceId)
	const { isOpenViewService, setIsOpenViewService } = useServicesContext()
	return (
		<Sheet open={isOpenViewService} onOpenChange={setIsOpenViewService}>
			<SheetContent
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.view.title')}</SheetTitle>
				</SheetHeader>
				<div className="flex-1 p-4">
					{isLoadingService && !service && <ViewSkeleton />}
					{!isLoadingService && service && (
						<Details.List>
							<Details.ListItem
								label={t('dashboard.services.view.fields.id')}
								value={service.id}
							/>
							<Details.ListItem
								label={t('dashboard.services.view.fields.name')}
								value={service.name}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.services.view.fields.base_price')}
								value={formatCurrency(service.base_price)}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.services.view.fields.description')}
								value={service.description}
								className="sm:col-span-2"
							/>
							<Details.ListItem
								label={t('dashboard.services.view.fields.created_at')}
								value={formatDate(service.created_at)}
								className="sm:col-span-2"
							/>
						</Details.List>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
