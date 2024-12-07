import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export type CreateServiceHistoryFields = {}

export function useGetCreateServiceHistoryIntlSchema() {
	const t = useTranslations('form-validations')
	const intlSchema = useMemo(() => {
		return z.object({})
	}, [t])

	return { intlSchema }
}
