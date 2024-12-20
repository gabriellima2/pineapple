import { forwardRef, useMemo } from 'react'
import { useLocale } from 'next-intl'

import { Input } from '@/components/ui/input'

import { cellPhoneBRMask, cellPhoneUSMask } from '@/helpers/masks'
import { LOCALES } from '@/constants/general'

type CellPhoneProps = Omit<Parameters<typeof Input>[0], 'type' | 'mask'>

export const CellPhone = forwardRef<HTMLInputElement, CellPhoneProps>(
	(props, ref) => {
		const locale = useLocale()

		const mask = useMemo(() => {
			const masks = {
				[LOCALES.pt]: cellPhoneBRMask,
				[LOCALES.en]: cellPhoneUSMask,
			}
			return masks[locale]
		}, [locale])

		return <Input type="text" mask={mask} ref={ref} {...props} />
	}
)

CellPhone.displayName = 'Inputs.CellPhone'
