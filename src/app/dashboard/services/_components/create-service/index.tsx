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

import { useCreateServiceForm } from './hooks/use-create-service-form'
import { useServicesContext } from '../../_contexts/services.context'

export function CreateService() {
	const t = useTranslations()
	const { form, isCreating, handleCreate } = useCreateServiceForm()
	const { isOpenCreateService, setIsOpenCreateService } = useServicesContext()

	function handleOpenChange(isOpen: boolean) {
		if (isCreating) return
		form.reset()
		setIsOpenCreateService(isOpen)
	}

	return (
		<Sheet open={isOpenCreateService} onOpenChange={handleOpenChange}>
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
					<SheetTitle>{t('dashboard.services.create.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form onSubmit={handleCreate} className="flex flex-1 flex-col">
						<div className="flex-1 space-y-4 p-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('dashboard.services.create.fields.name')}{' '}
											<RequiredIndicator />
										</FormLabel>
										<FormControl>
											<Inputs.Default {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="base_price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('dashboard.services.create.fields.base_price')}{' '}
											<RequiredIndicator />
										</FormLabel>
										<FormControl>
											<Inputs.Currency {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('dashboard.services.create.fields.description')}
										</FormLabel>
										<FormControl>
											<Inputs.Default {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
