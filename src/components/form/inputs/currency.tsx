import { forwardRef, useMemo } from 'react'
import { useLocale } from 'next-intl'

import { Input } from '@/components/ui/input'

import { currencyBRLMask, currencyUSDMask } from '@/helpers/masks'
import { LOCALES } from '@/constants/general'

type CurrencyProps = Omit<Parameters<typeof Input>[0], 'type' | 'mask'>

export const Currency = forwardRef<HTMLInputElement, CurrencyProps>(
	(props, ref) => {
		const locale = useLocale()

		const mask = useMemo(() => {
			const masks = {
				[LOCALES.pt]: currencyBRLMask,
				[LOCALES.en]: currencyUSDMask,
			}
			return masks[locale]
		}, [locale])

		return <Input type="text" mask={mask} ref={ref} {...props} />
	}
)

Currency.displayName = 'Inputs.Currency'
