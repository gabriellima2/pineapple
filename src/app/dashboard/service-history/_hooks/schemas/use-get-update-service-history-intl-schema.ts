import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export type UpdateServiceHistoryFields = {}

export function useGetUpdateServiceHistoryIntlSchema() {
	const t = useTranslations('form-validations')
	const intlSchema = useMemo(() => {
		return z.object({})
	}, [t])

	return { intlSchema }
}
