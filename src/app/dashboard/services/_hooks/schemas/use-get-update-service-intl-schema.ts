import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export type UpdateServiceFields = z.infer<
	Pick<
		ReturnType<typeof useGetUpdateServiceIntlSchema>,
		'intlSchema'
	>['intlSchema']
>

export function useGetUpdateServiceIntlSchema() {
	const t = useTranslations('form-validations')
	const intlSchema = useMemo(() => {
		return z.object({
			name: z
				.string({ required_error: t('required_error') })
				.min(1, { message: t('required_error') }),
			description: z.string().optional(),
			base_price: z
				.string({ required_error: t('required_error') })
				.min(1, { message: t('required_error') }),
		})
	}, [t])

	return { intlSchema }
}
