import { useMemo } from 'react'
import { useIntlFormatter } from '@/hooks/use-intl-formatter'

type ShowDateProps = {
	date: string
}

export function ShowDate(props: ShowDateProps) {
	const { date } = props
	const { formatDate } = useIntlFormatter()
	const formatted = useMemo(() => formatDate(date), [date, formatDate])
	return formatted
}
