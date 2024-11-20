import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useServicesContext } from '../../../_contexts/services.context'
import { useToast } from '@/hooks/use-toast'

import { createService } from '../../../_actions/service-action'
import { MUTATION_KEYS } from '@/constants/keys'

import {
	useGetCreateServiceIntlSchema,
	type CreateServiceFields,
} from '../../../_hooks/use-get-create-service-intl-schema'

export function useCreateServiceForm() {
	const t = useTranslations()
	const { toast } = useToast()
	const { closeCreateService } = useServicesContext()
	const { intlSchema } = useGetCreateServiceIntlSchema()
	const form = useForm<CreateServiceFields>({
		resolver: zodResolver(intlSchema),
		defaultValues: {
			name: '',
			description: '',
			base_price: '',
		},
	})

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createService,
		mutationKey: [MUTATION_KEYS.CREATE_SERVICE],
		onSuccess: () => {
			closeCreateService()
			toast({
				title: t('dashboard.services.create.notification.success.title'),
				description: t(
					'dashboard.services.create.notification.success.description'
				),
			})
		},
		onError: () => {
			toast({
				title: t('dashboard.services.create.notification.error.title'),
				description: t(
					'dashboard.services.create.notification.error.description'
				),
				variant: 'destructive',
			})
		},
	})

	async function onSubmit(data: CreateServiceFields) {
		await mutateAsync(data)
	}

	return {
		form,
		isCreating: isPending,
		handleCreate: form.handleSubmit(onSubmit),
	}
}
