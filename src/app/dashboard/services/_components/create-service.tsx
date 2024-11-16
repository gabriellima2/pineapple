'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useToast } from '@/hooks/use-toast'

import { createService } from '../_actions/service-action'
import { currencyMask } from '@/helpers/masks'

import {
	createServiceSchema,
	type CreateServiceFields,
} from '../_schema/service.schema'

export function CreateService() {
	const t = useTranslations()
	const { toast } = useToast()
	const [open, setOpen] = useState(false)
	const form = useForm<CreateServiceFields>({
		resolver: zodResolver(createServiceSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})
	const isSubmitting = form.formState.isSubmitting

	async function onSubmit(data: CreateServiceFields) {
		if (isSubmitting) return
		try {
			await createService(data)
			setOpen(false)
			toast({
				title: t('dashboard.services.create.notification.success.title'),
				description: t(
					'dashboard.services.create.notification.success.description'
				),
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			toast({
				title: t('dashboard.services.create.notification.error.title'),
				description: t(
					'dashboard.services.create.notification.error.description'
				),
				variant: 'destructive',
			})
		}
	}

	function handleOpenChange(isOpen: boolean) {
		if (isSubmitting) return
		form.reset()
		setOpen(isOpen)
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<Button className="flex-1 sm:flex-none">
					{t('actions.create')} <Plus />
				</Button>
			</SheetTrigger>
			<SheetContent
				disabled={isSubmitting}
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>{t('dashboard.services.create.title')}</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-1 flex-col"
					>
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
											{t('dashboard.services.create.fields.base_price')}{' '}
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
											{t('dashboard.services.create.fields.description')}
										</FormLabel>
										<FormControl>
											<Input {...field} />
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
