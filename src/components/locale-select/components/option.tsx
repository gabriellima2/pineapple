'use client'

import { useTranslations } from 'use-intl'
import { SelectItem } from '@/components/ui/select'

type OptionProps = {
	value: string
}

export function Option(props: OptionProps) {
	const { value } = props
	const t = useTranslations('locales')
	return <SelectItem value={value}>{t(value)}</SelectItem>
}
