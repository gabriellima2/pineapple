import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import MultiSelect, { type MultiSelectRef } from '@/components/ui/multi-select'

type SearchableProps = Omit<
	Parameters<typeof MultiSelect>[0],
	'emptyIndicator' | 'maxSelected'
>

export const Searchable = forwardRef<MultiSelectRef, SearchableProps>(
	(props, ref) => {
		const t = useTranslations()
		return (
			<MultiSelect
				{...props}
				ref={ref}
				maxSelected={1}
				emptyIndicator={
					<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
						{t('general.multi-select-empty-options')}
					</p>
				}
			/>
		)
	}
)

Searchable.displayName = 'Searchable'
