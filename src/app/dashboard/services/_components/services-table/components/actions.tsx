import { useMemo } from 'react'

import { DataTable } from '@/components/data-table'
import type { TableData } from '../@types/table-data'

type ActionsProps = {
	service: TableData
}

export function Actions(props: ActionsProps) {
	const { service } = props

	const actions = useMemo(
		() => [
			{
				label: 'Copiar ID',
				separator: true,
				onClick: () => navigator.clipboard.writeText(service.id),
			},
			{ label: 'Visualizar' },
			{ label: 'Editar' },
		],
		[service]
	)

	return <DataTable.Actions actions={actions} />
}
