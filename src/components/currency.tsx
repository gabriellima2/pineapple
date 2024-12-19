import { useMemo } from 'react'
import { useIntlFormatter } from '@/hooks/use-intl-formatter'

type CurrencyProps = {
	value: number | string
}

export function Currency(props: CurrencyProps) {
	const { value } = props
	const { formatCurrency } = useIntlFormatter()

	const formattedCurrency = useMemo(
		() => formatCurrency(value),
		[value, formatCurrency]
	)

	return formattedCurrency
}
