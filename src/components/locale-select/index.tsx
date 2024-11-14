import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Option } from './components/option'

import { getLocaleCookie, setLocaleCookie } from '@/actions/cookies.actions'

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
				<Option value="en" />
				<Option value="pt" />
			</SelectContent>
		</Select>
	)
}
