import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { enUS, ptBR } from 'date-fns/locale'

import { LOCALES } from '@/constants/general'
import { showDate } from '@/utils/date'

type ShowDateProps = {
	date: string
}

export function ShowDate(props: ShowDateProps) {
	const { date } = props
	const locale = useLocale()

	const formatted = useMemo(() => {
		if (locale === LOCALES.en) {
			return showDate(date, 'MM/dd/yyyy', { locale: enUS })
		}
		if (locale === LOCALES.pt) {
			return showDate(date, 'dd/MM/yyyy', { locale: ptBR })
		}
	}, [date, locale])

	return formatted
}
