'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { Breadcumbs } from '@/components/breadcumbs'
import type { Translations } from '@/@types/translations'

export function CustomersBreadcumbs() {
	const t = useTranslations()
	const breadcumbs = useMemo(() => getBreadcumbs(t), [t])
	return <Breadcumbs breadcumbs={breadcumbs} />
}

const getBreadcumbs = (t: Translations) => [
	{
		title: t('dashboard.customers.breadcumbs.1'),
	},
]
