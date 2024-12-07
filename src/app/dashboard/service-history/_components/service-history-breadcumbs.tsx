'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { Breadcumbs } from '@/components/breadcumbs'
import type { Translations } from '@/@types/translations'

export function ServiceHistoryBreadcumbs() {
	const t = useTranslations()
	const breadcumbs = useMemo(() => getBreadcumbs(t), [t])
	return <Breadcumbs breadcumbs={breadcumbs} />
}

const getBreadcumbs = (t: Translations) => [
	{
		title: t('dashboard.service-history.breadcumbs.1'),
	},
]
