import { useCallback } from 'react'
import { useLocale } from 'next-intl'

import { formatCurrency, formatDate } from '@/utils/intl'

export function useIntlFormatter() {
	const locale = useLocale()

	const handleFormatCurrency = useCallback(
		(value: string | number) => {
			return formatCurrency(value, { locale })
		},
		[locale]
	)

	const handleFormatDate = useCallback(
		(date: string | Date) => {
			return formatDate(date, { locale })
		},
		[locale]
	)

	return {
		formatCurrency: handleFormatCurrency,
		formatDate: handleFormatDate,
	}
}
