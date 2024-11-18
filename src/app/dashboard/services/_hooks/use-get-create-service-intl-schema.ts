import { useMemo } from 'react'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

export type CreateServiceFields = {
	name: string
	base_price: string
	description?: string | undefined
}

export function useGetCreateServiceIntlSchema() {
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
