'use client'
import { useTranslations } from 'use-intl'
import { SelectValue } from '@/components/ui/select'

export function Placeholder() {
	const t = useTranslations('global.selects.locale')
	return <SelectValue placeholder={t('placeholder')} />
}
