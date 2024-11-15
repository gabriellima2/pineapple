import { useMemo } from 'react'

import { DataTable } from '@/components/data-table'
import type { TableData } from '../@types/table-data'
import { useTranslations } from 'next-intl'

type ActionsProps = {
	service: TableData
}

export function Actions(props: ActionsProps) {
	const { service } = props
	const t = useTranslations()

	const actions = useMemo(
		() => [
			{
				label: t('actions.copy-id'),
				separator: true,
				onClick: () => navigator.clipboard.writeText(service.id),
			},
			{ label: t('actions.view') },
			{ label: t('actions.update') },
		],
		[t, service]
	)

	return <DataTable.Actions actions={actions} />
}
