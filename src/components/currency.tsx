import { useMemo } from 'react'

type CurrencyProps = {
	value: number | string
}

export function Currency(props: CurrencyProps) {
	const { value } = props

	const formatted = useMemo(() => {
		const floatValue = typeof value === 'string' ? parseFloat(value) : value
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(isNaN(floatValue) ? 0 : floatValue)
	}, [value])

	return formatted
}
