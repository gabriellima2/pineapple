import { useTranslations } from 'next-intl'
import { LocaleSelect } from '@/components/locale-select'

export default function Home() {
	const t = useTranslations('HomePage')
	return (
		<div>
			<h1>{t('title')}</h1>
			<LocaleSelect />
		</div>
	)
}
