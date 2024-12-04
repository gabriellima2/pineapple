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

import { useGetServiceById } from '../../_hooks/queries/use-get-service-by-id'
import { useUpdateServiceForm } from './hooks/use-update-service-form'
import { useServicesContext } from '../../_contexts/services.context'

import { currencyMask } from '@/helpers/masks'

type UpdateServiceProps = {
	serviceId: string
}

export function UpdateService(props: UpdateServiceProps) {
	const { serviceId } = props
	const t = useTranslations()
	const { service, isLoadingService } = useGetServiceById(serviceId)
	const { isOpenUpdateService, setIsOpenUpdateService } = useServicesContext()
	const { form, isUpdating, handleUpdate } = useUpdateServiceForm(serviceId)

	function handleOpenChange(isOpen: boolean) {
		if (isUpdating) return
		setIsOpenUpdateService(isOpen)
	}

	useEffect(() => {
		if (!service) return
		form.reset({
			name: service.name,
			description: service.description || '',
			base_price: currencyMask(service.base_price),
		})
	}, [service, form])

	return (
		<Sheet open={isOpenUpdateService} onOpenChange={handleOpenChange}>
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
							{isLoadingService ? (
								<UpdateSkeleton />
							) : (
								<>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t('dashboard.services.update.fields.name')}{' '}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<Input {...field} />
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
													{t('dashboard.services.update.fields.base_price')}{' '}
													<RequiredIndicator />
												</FormLabel>
												<FormControl>
													<Input mask={currencyMask} {...field} />
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
													{t('dashboard.services.update.fields.description')}
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
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
