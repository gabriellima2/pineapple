import { memo, useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { DataTable } from '@/components/data-table'
import { ActionIcons } from '@/components/icons'

import { useServiceHistoryContext } from '../../../../../_contexts/service-history.context'
import type { TableData } from '../../../../../_@types/table-data'

type ActionsProps = {
	service: TableData
}

export const Actions = memo((props: ActionsProps) => {
	const { service } = props
	const t = useTranslations()
	const {
		openUpdateServiceHistory,
		openViewServiceHistory,
		openDeleteServiceHistory,
	} = useServiceHistoryContext()

	const actions: RowAction[] = useMemo(
		() => [
			{
				label: t('actions.copy-id'),
				separator: true,
				onClick: () => navigator.clipboard.writeText(service.id),
				icon: <ActionIcons.CopyId />,
			},
			{
				label: t('actions.view'),
				onClick: () => openViewServiceHistory(service),
				icon: <ActionIcons.View />,
			},
			{
				label: t('actions.update'),
				onClick: () => openUpdateServiceHistory(service),
				icon: <ActionIcons.Update />,
			},
			{
				label: t('actions.delete'),
				onClick: () => openDeleteServiceHistory(service),
				className: 'text-destructive focus:text-destructive',
				icon: <ActionIcons.Delete />,
			},
		],
		[
			t,
			service,
			openUpdateServiceHistory,
			openViewServiceHistory,
			openDeleteServiceHistory,
		]
	)

	return <DataTable.Actions actions={actions} />
})

Actions.displayName = 'Actions'
