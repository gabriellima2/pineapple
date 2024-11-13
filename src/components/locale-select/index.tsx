import { Select, SelectContent, SelectTrigger } from '../ui/select'
import { SelectPlaceholder } from './components/select-placeholder'
import { SelectOption } from './components/select-option'

import { getLocaleCookie, setLocaleCookie } from '@/actions/cookies.actions'

export async function LocaleSelect() {
	const locale = await getLocaleCookie()
	return (
		<Select onValueChange={setLocaleCookie} value={locale}>
			<SelectTrigger className="w-[180px]">
				<SelectPlaceholder />
			</SelectTrigger>
			<SelectContent>
				<SelectOption value="en" />
				<SelectOption value="pt" />
			</SelectContent>
		</Select>
	)
}
