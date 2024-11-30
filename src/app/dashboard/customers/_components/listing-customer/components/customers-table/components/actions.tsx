import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { DataTable } from '@/components/data-table'
import { ActionIcons } from '@/components/icons'

import { useCustomersContext } from '../../../../../_contexts/customers.context'
import type { TableData } from '../../../../../_@types/table-data'

type ActionsProps = {
	customer: TableData
}

export function Actions(props: ActionsProps) {
	const { customer } = props
	const t = useTranslations()
	const { openUpdateCustomer, openViewCustomer, openDeleteCustomer } =
		useCustomersContext()

	const actions: RowAction[] = useMemo(
		() => [
			{
				label: t('actions.copy-id'),
				separator: true,
				onClick: () => navigator.clipboard.writeText(customer.id),
				icon: <ActionIcons.CopyId />,
			},
			{
				label: t('actions.view'),
				onClick: () => openViewCustomer(customer),
				icon: <ActionIcons.View />,
			},
			{
				label: t('actions.update'),
				onClick: () => openUpdateCustomer(customer),
				icon: <ActionIcons.Update />,
			},
			{
				label: t('actions.delete'),
				onClick: () => openDeleteCustomer(customer),
				className: 'text-destructive focus:text-destructive',
				icon: <ActionIcons.Delete />,
			},
		],
		[t, customer, openUpdateCustomer, openViewCustomer, openDeleteCustomer]
	)

	return <DataTable.Actions actions={actions} />
}
