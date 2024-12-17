import { useMemo } from 'react'
import { useLocale } from 'next-intl'

import { LOCALES } from '@/constants/general'

type CurrencyProps = {
	value: number | string
}

export function Currency(props: CurrencyProps) {
	const { value } = props
	const locale = useLocale()

	const formatted = useMemo(() => {
		let numberFormat: Intl.NumberFormat | undefined
		const floatValue = typeof value === 'string' ? parseFloat(value) : value
		if (locale === LOCALES.en) {
			numberFormat = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			})
		} else if (locale === LOCALES.pt) {
			numberFormat = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			})
		}
		return numberFormat?.format(isNaN(floatValue) ? 0 : floatValue)
	}, [value, locale])

	return formatted
}
