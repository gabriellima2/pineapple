import { forwardRef, useMemo } from 'react'
import { CalendarIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import { parseISO } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar, type CalendarProps } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { useIntlFormatter } from '@/hooks/use-intl-formatter'

import { LOCALES } from '@/constants/general'
import { cn } from '@/lib/utils'

type DefaultProps = Omit<CalendarProps, 'selected' | 'onSelect' | 'mode'> & {
	value?: string
	onChange?: (value: string | undefined) => void
	placeholder?: string
}

export const Default = forwardRef<HTMLButtonElement, DefaultProps>(
	(props, ref) => {
		const { value, onChange, placeholder, ...rest } = props
		const locale = useLocale()
		const { formatDate } = useIntlFormatter()

		const calendarLocale = useMemo(() => {
			const locales = {
				[LOCALES.en]: enUS,
				[LOCALES.pt]: ptBR,
			}
			return locales[locale]
		}, [locale])

		return (
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							ref={ref}
							variant="outline"
							className={cn(
								'w-full pl-3 text-left font-normal',
								!value && 'text-muted-foreground'
							)}
						>
							{value ? formatDate(value, 'PPP') : <span>{placeholder}</span>}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						locale={calendarLocale}
						selected={value ? parseISO(value) : undefined}
						onSelect={(date) => onChange?.(date?.toISOString() || '')}
						initialFocus
						{...rest}
					/>
				</PopoverContent>
			</Popover>
		)
	}
)

Default.displayName = 'Default'
