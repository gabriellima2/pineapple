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

import { useGetServiceHistoryById } from '../_hooks/queries/use-get-service-history-by-id'
import { useServiceHistoryContext } from '../_contexts/service-history.context'

type ViewServiceHistoryProps = {
	serviceHistoryId: string
}

export function ViewServiceHistory(props: ViewServiceHistoryProps) {
	const { serviceHistoryId } = props
	const t = useTranslations()
	const { service, isLoadingService } =
		useGetServiceHistoryById(serviceHistoryId)
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
					{isLoadingService && !service && <ViewSkeleton />}
					{!isLoadingService && service && <Details.List></Details.List>}
				</div>
			</SheetContent>
		</Sheet>
	)
}
