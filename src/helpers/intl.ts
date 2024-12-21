import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

import { currencyBRLMask, currencyUSDMask } from '@/helpers/masks'
import { LOCALES } from '@/constants/general'

type DefaultOptions = { locale: string }

export function formatCurrency(
	value: string | number,
	options: DefaultOptions
) {
	const { locale } = options
	const floatValue = typeof value === 'string' ? parseFloat(value) : value

	const formatters: Record<string, () => Intl.NumberFormat> = {
		[LOCALES.en]: () => {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			})
		},
		[LOCALES.pt]: () => {
			return new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			})
		},
	}

	const formatter = formatters?.[locale]()
	return formatter?.format(isNaN(floatValue) ? 0 : floatValue)
}

type FormatDateOptions = DefaultOptions & { formatStr?: string }

export function formatDate(date: string | Date, options: FormatDateOptions) {
	const { locale, formatStr } = options

	const formatters: Record<string, () => string> = {
		[LOCALES.en]: () => {
			return format(date, formatStr || 'MM/dd/yyyy', { locale: enUS })
		},
		[LOCALES.pt]: () => {
			return format(date, formatStr || 'dd/MM/yyyy', { locale: ptBR })
		},
	}

	const formatter = formatters[locale]
	return formatter?.()
}

export function applyCurrencyMask(
	value: string | number,
	options: DefaultOptions
) {
	const { locale } = options

	const formatters: Record<string, (value: string | number) => string> = {
		[LOCALES.en]: currencyUSDMask,
		[LOCALES.pt]: currencyBRLMask,
	}

	const formatter = formatters?.[locale]
	return formatter?.(value)
}
