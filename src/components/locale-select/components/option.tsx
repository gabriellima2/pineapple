'use client'

import { useTranslations } from 'use-intl'
import { SelectItem } from '@/components/ui/select'

type OptionProps = {
	value: string
}

export function Option(props: OptionProps) {
	const { value } = props
	const t = useTranslations('global.selects.locale')
	return <SelectItem value={value}>{t(`values.${value}`)}</SelectItem>
}
