/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { RequiredIndicator } from '@/components/required-indicator'
import { Inputs } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'

import { useCreateServiceHistoryForm } from './hooks/use-create-service-history-form'
import { useServiceHistoryContext } from '../../_contexts/service-history.context'

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
						<div className="flex-1 space-y-4 p-4"></div>
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
