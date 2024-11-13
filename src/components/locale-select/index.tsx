import { Select, SelectContent, SelectTrigger } from '../ui/select'
import { Placeholder } from './components/placeholder'
import { Option } from './components/option'

import { getLocaleCookie, setLocaleCookie } from '@/actions/cookies.actions'

export async function LocaleSelect() {
	const locale = await getLocaleCookie()
	return (
		<Select onValueChange={setLocaleCookie} value={locale}>
			<SelectTrigger className="w-[180px]">
				<Placeholder />
			</SelectTrigger>
			<SelectContent>
				<Option value="en" />
				<Option value="pt" />
			</SelectContent>
		</Select>
	)
}
