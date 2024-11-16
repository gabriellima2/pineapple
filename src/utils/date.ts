import { formatDate, parseISO } from 'date-fns'

export function isInvalidDate(date: string | Date) {
	if (!date || (typeof date === 'string' && isNaN(parseISO(date).getTime())))
		return true
	if (!date || (date instanceof Date && isNaN(date.getTime()))) return true
	return false
}

export function showDate(
	date: string | Date,
	formatStr = 'dd/MM/yyyy - HH:mm:ss'
) {
	if (isInvalidDate(date)) return ''
	return formatDate(date, formatStr)
}
