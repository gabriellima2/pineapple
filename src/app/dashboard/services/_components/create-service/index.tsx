'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
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

import { createService } from './actions/create-service.action'
import { currencyMask } from '@/helpers/masks'

import {
	createServiceSchema,
	type CreateServiceFields,
} from './schema/create-service.schema'

export function CreateService() {
	const { toast } = useToast()
	const [open, setOpen] = useState(false)
	const form = useForm<CreateServiceFields>({
		resolver: zodResolver(createServiceSchema),
		defaultValues: {
			name: '',
			description: '',
			basePrice: '',
		},
	})
	const isSubmitting = form.formState.isSubmitting

	async function onSubmit(data: CreateServiceFields) {
		if (isSubmitting) return
		try {
			await createService(data)
			setOpen(false)
			toast({
				title: 'Tudo certo!',
				description: 'O serviço foi adicionado com sucesso.',
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			toast({
				title: 'Algo deu errado...',
				description:
					'Ocorreu um erro inesperado ao tentar adicionar o serviço. Por favor, tente novamente.',
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
					Adicionar <Plus />
				</Button>
			</SheetTrigger>
			<SheetContent
				aria-describedby={undefined}
				className="flex flex-col gap-0"
			>
				<SheetHeader>
					<SheetTitle>Adicionar um novo serviço</SheetTitle>
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
											Nome <RequiredIndicator />
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
								name="basePrice"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Valor base <RequiredIndicator />
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
										<FormLabel>Descrição</FormLabel>
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
									Cancelar
								</Button>
							</SheetClose>
							<Button type="submit" className="w-full" loading={isSubmitting}>
								Salvar
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
