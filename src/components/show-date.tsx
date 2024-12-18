import { useMemo } from 'react'
import { useLocale } from 'next-intl'

import { formatDate } from '@/utils/intl'

type ShowDateProps = {
	date: string
}

export function ShowDate(props: ShowDateProps) {
	const { date } = props
	const locale = useLocale()
	const formatted = useMemo(() => formatDate(date, { locale }), [date, locale])
	return formatted
}
