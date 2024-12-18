/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useGetServiceHistoryWithDetailsById } from '../../_hooks/queries/use-get-service-history-with-details-by-id'
import { useServiceHistoryContext } from '../../_contexts/service-history.context'
import { useUpdateServiceHistoryForm } from './hooks/use-update-service-history-form'

type UpdateServiceHistoryProps = {
	serviceHistoryId: string
}

export function UpdateServiceHistory(props: UpdateServiceHistoryProps) {
	const { serviceHistoryId } = props
	const t = useTranslations()
	const { serviceHistory, isLoadingServiceHistory } =
		useGetServiceHistoryWithDetailsById(serviceHistoryId)
	const { isOpenUpdateServiceHistory, setIsOpenUpdateServiceHistory } =
		useServiceHistoryContext()
	const { form, isUpdating, handleUpdate } =
		useUpdateServiceHistoryForm(serviceHistoryId)

	function handleOpenChange(isOpen: boolean) {
		if (isUpdating) return
		setIsOpenUpdateServiceHistory(isOpen)
	}

	useEffect(() => {
		if (!serviceHistory) return
		form.reset({})
	}, [serviceHistory, form])

	return (
		<Sheet open={isOpenUpdateServiceHistory} onOpenChange={handleOpenChange}>
			<SheetContent
				disabled={isUpdating}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.update.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleUpdate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							{isLoadingServiceHistory ? <UpdateSkeleton /> : <></>}
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
