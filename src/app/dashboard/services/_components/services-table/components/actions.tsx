import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { DataTable } from '@/components/data-table'

import { useServicesContext } from '../../../_contexts/services.context'
import type { TableData } from '../../../_@types/table-data'

type ActionsProps = {
	service: TableData
}

export function Actions(props: ActionsProps) {
	const { service } = props
	const t = useTranslations()
	const { openUpdateService } = useServicesContext()

	const actions = useMemo(
		() => [
			{
				label: t('actions.copy-id'),
				separator: true,
				onClick: () => navigator.clipboard.writeText(service.id),
			},
			{ label: t('actions.view') },
			{ label: t('actions.update'), onClick: () => openUpdateService(service) },
		],
		[t, service, openUpdateService]
	)

	return <DataTable.Actions actions={actions} />
}
