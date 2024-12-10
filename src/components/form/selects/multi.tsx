import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import MultiSelect, { type MultiSelectRef } from '@/components/ui/multi-select'

type MultiProps = Omit<Parameters<typeof MultiSelect>[0], 'emptyIndicator'>

export const Multi = forwardRef<MultiSelectRef, MultiProps>((props, ref) => {
	const t = useTranslations()
	return (
		<MultiSelect
			{...props}
			ref={ref}
			emptyIndicator={
				<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
					{t('general.multi-select-empty-options')}
				</p>
			}
		/>
	)
})

Multi.displayName = 'Multi'
