import { useMemo } from 'react'
import { useLocale } from 'next-intl'

import { formatCurrency } from '@/utils/intl'

type CurrencyProps = {
	value: number | string
}

export function Currency(props: CurrencyProps) {
	const { value } = props
	const locale = useLocale()

	const formattedCurrency = useMemo(
		() => formatCurrency(value, { locale }),
		[value, locale]
	)

	return formattedCurrency
}
