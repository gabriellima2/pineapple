'use client'

import { useTranslations } from 'next-intl'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from './components/skeleton'

import { useGetServiceById } from '../../_hooks/use-get-service-by-id'
import { useServicesContext } from '../../_contexts/services.context'

import { currencyMask } from '@/helpers/masks'
import { showDate } from '@/utils/date'

type ViewServiceProps = {
	serviceId: string
}

export function ViewService(props: ViewServiceProps) {
	const { serviceId } = props
	const t = useTranslations()
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
					{isLoadingService && !service && <Skeleton />}
					{!isLoadingService && service && (
						<ul className="grid grid-cols-4 gap-8">
							<li className="col-span-full flex flex-col gap-1">
								<span className="font-medium">
									{t('dashboard.services.view.fields.id')}:
								</span>
								{service.id}
							</li>
							<li className="col-span-full flex flex-col gap-1 sm:col-span-2">
								<span className="font-medium">
									{t('dashboard.services.view.fields.name')}:
								</span>
								{service.name}
							</li>
							<li className="col-span-full flex flex-col gap-1 sm:col-span-2">
								<span className="font-medium">
									{t('dashboard.services.view.fields.base_price')}:
								</span>
								{currencyMask(service.base_price)}
							</li>
							<li className="col-span-full flex flex-col gap-1 sm:col-span-2">
								<span className="font-medium">
									{t('dashboard.services.view.fields.description')}:
								</span>
								{service.description || 'N/A'}
							</li>
							<li className="col-span-full flex flex-col gap-1 sm:col-span-2">
								<span className="font-medium">
									{t('dashboard.services.view.fields.created_at')}:
								</span>
								{showDate(service.created_at)}
							</li>
						</ul>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
