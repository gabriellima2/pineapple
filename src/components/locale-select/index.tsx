import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Option } from './components/option'

import { getLocaleCookie, setLocaleCookie } from '@/actions/cookies.actions'
import { LOCALES } from '@/constants/general'

export async function LocaleSelect() {
	const locale = await getLocaleCookie()
	return (
		<Select onValueChange={setLocaleCookie} value={locale}>
			<SelectTrigger
				className="flex size-11 items-center justify-center p-0 uppercase"
				hasArrowIcon={false}
			>
				<SelectValue>{locale}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<Option value={LOCALES.en} />
				<Option value={LOCALES.pt} />
			</SelectContent>
		</Select>
	)
}
