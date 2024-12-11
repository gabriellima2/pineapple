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
			done_at: z
				.string({ required_error: t('required_error') })
				.min(1, { message: t('required_error') }),
			charged_amount: z
				.string({ required_error: t('required_error') })
				.min(1, { message: t('required_error') }),
			received_amount: z.string().optional(),
			service_id: z
				.object({ label: z.string(), value: z.string() })
				.array()
				.refine((options) => !!options?.length, {
					message: t('required_error'),
				}),
			customer_id: z
				.object({ label: z.string(), value: z.string() })
				.array()
				.refine((options) => !!options?.length, {
					message: t('required_error'),
				}),
		})
	}, [t])

	return { intlSchema }
}
