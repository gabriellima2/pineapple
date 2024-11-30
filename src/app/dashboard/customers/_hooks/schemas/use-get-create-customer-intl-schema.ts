import { useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { z } from 'zod'

import { CELL_PHONE_LENGTH } from '@/constants/general'

export type CreateCustomerFields = {
	name: string
	email?: string | undefined
	cell_phone?: string | undefined
}

export function useGetCreateCustomerIntlSchema() {
	const t = useTranslations('form-validations')
	const locale = useLocale()

	const cellPhoneLength = CELL_PHONE_LENGTH[locale]

	const intlSchema = useMemo(() => {
		return z.object({
			name: z
				.string({ required_error: t('required_error') })
				.min(1, { message: t('required_error') }),
			email: z
				.string()
				.optional()
				.refine(
					(value) => !value || z.string().email().safeParse(value).success,
					{ message: t('invalid_email') }
				),
			cell_phone: z
				.string()
				.optional()
				.refine(
					(value) =>
						!value || value.replaceAll(' ', '').length === cellPhoneLength,
					{ message: t('invalid_cell_phone') }
				),
		})
	}, [t, cellPhoneLength])

	return { intlSchema }
}
