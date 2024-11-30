import { forwardRef } from 'react'
import { useLocale } from 'next-intl'

import { Input } from '@/components/ui/input'

import { cellPhoneMask, usCellPhoneMask } from '@/helpers/masks'
import { LOCALES } from '@/constants/general'

type CellPhoneProps = Omit<Parameters<typeof Input>[0], 'type' | 'mask'>

export const CellPhone = forwardRef<HTMLInputElement, CellPhoneProps>(
	(props, ref) => {
		const locale = useLocale()
		return (
			<Input
				type="text"
				mask={locale === LOCALES.pt ? cellPhoneMask : usCellPhoneMask}
				ref={ref}
				{...props}
			/>
		)
	}
)

CellPhone.displayName = 'Inputs.CellPhone'
