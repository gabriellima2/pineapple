import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export type CreateServiceHistoryFields = z.infer<
	Pick<
		ReturnType<typeof useGetCreateServiceHistoryIntlSchema>,
		'intlSchema'
	>['intlSchema']
>

export function useGetCreateServiceHistoryIntlSchema() {
	const t = useTranslations('form-validations')
	const intlSchema = useMemo(() => {
		return z.object({
			services: z
				.object({
					done_at: z
						.string({ required_error: t('required_error') })
						.min(1, { message: t('required_error') }),
					charged_amount: z
						.string({ required_error: t('required_error') })
						.min(1, { message: t('required_error') }),
					was_paid: z
						.string({ required_error: t('required_error') })
						.min(1, { message: t('required_error') }),
					service_id: z
						.string({ required_error: t('required_error') })
						.min(1, { message: t('required_error') }),
					customer_id: z
						.string({ required_error: t('required_error') })
						.min(1, { message: t('required_error') }),
				})
				.array(),
		})
	}, [t])

	return { intlSchema }
}
