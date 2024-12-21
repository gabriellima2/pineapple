import { useCallback } from 'react'
import { useLocale } from 'next-intl'

import { applyCurrencyMask, formatCurrency, formatDate } from '@/helpers/intl'

export function useIntlFormatter() {
	const locale = useLocale()

	const handleFormatCurrency = useCallback(
		(value: string | number) => {
			return formatCurrency(value, { locale })
		},
		[locale]
	)

	const handleFormatDate = useCallback(
		(date: string | Date, formatStr?: string) => {
			return formatDate(date, { locale, formatStr })
		},
		[locale]
	)

	const handleApplyCurrencyMask = useCallback(
		(value: string | number) => {
			return applyCurrencyMask(value, { locale })
		},
		[locale]
	)

	return {
		formatCurrency: handleFormatCurrency,
		formatDate: handleFormatDate,
		applyCurrencyMask: handleApplyCurrencyMask,
	}
}
