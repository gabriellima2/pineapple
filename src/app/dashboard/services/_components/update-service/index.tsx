'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Skeleton } from './components/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useGetServiceById } from '../../_hooks/use-get-service-by-id'
import { useServicesContext } from '../../_contexts/services.context'
import { useToast } from '@/hooks/use-toast'

import { updateService } from '../../_actions/service-action'
import { currencyMask } from '@/helpers/masks'

import {
	useGetUpdateServiceIntlSchema,
	type UpdateServiceFields,
} from '../../_hooks/use-get-update-service-intl-schema'

type UpdateServiceProps = {
	serviceId: string
}

export function UpdateService(props: UpdateServiceProps) {
	const { serviceId } = props
	const t = useTranslations()
	const { toast } = useToast()
	const { intlSchema } = useGetUpdateServiceIntlSchema()
	const { service, isLoadingService } = useGetServiceById(serviceId)
	const { isOpenUpdateService, setIsOpenUpdateService, closeUpdateService } =
		useServicesContext()
	const form = useForm<UpdateServiceFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})
	const isSubmitting = form.formState.isSubmitting

	async function onSubmit(data: UpdateServiceFields) {
		if (isSubmitting) return
		try {
			await updateService(serviceId, data)
			closeUpdateService()
			toast({
				title: t('dashboard.services.update.notification.success.title'),
				description: t(
					'dashboard.services.update.notification.success.description'
				),
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			toast({
				title: t('dashboard.services.update.notification.error.title'),
				description: t(
					'dashboard.services.update.notification.error.description'
				),
				variant: 'destructive',
			})
		}
	}

	function handleOpenChange(isOpen: boolean) {
		if (isSubmitting) return
		form.reset()
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
				disabled={isSubmitting}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.update.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-1 flex-col"
					>
						<div className="flex-1 space-y-4 p-4">
							{isLoadingService ? (
								<Skeleton />
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
									disabled={isSubmitting}
								>
									{t('buttons.cancel')}
								</Button>
							</SheetClose>
							<Button type="submit" className="w-full" loading={isSubmitting}>
								{t('buttons.save')}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
