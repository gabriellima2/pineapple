'use client'
import { useTranslations } from 'use-intl'
import { SelectItem } from '@/components/ui/select'

type SelectOptionProps = {
	value: string
}

export function SelectOption(props: SelectOptionProps) {
	const { value } = props
	const t = useTranslations('global.selects.locale')
	return <SelectItem value={value}>{t(`values.${value}`)}</SelectItem>
}
