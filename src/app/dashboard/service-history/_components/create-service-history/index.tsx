'use client'

import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Services } from './components/services'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

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
		<Dialog open={isOpenCreateServiceHistory} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button className="flex-1 sm:flex-none">
					{t('actions.create')} <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent
				aria-describedby={undefined}
				className="flex max-h-[80%] max-w-[70%] flex-col gap-0 overflow-y-auto pb-0"
			>
				<DialogHeader>
					<DialogTitle>
						{t('dashboard.service-history.create.title')}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleCreate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 pt-8">
							<Services />
						</div>
						<DialogFooter className="sticky bottom-0 bg-white/60 pb-8 pt-4 backdrop-blur-sm">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									className="w-full"
									disabled={isCreating}
								>
									{t('buttons.cancel')}
								</Button>
							</DialogClose>
							<Button type="submit" className="w-full" loading={isCreating}>
								{t('buttons.save')}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
