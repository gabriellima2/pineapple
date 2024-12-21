'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { CreateService } from '../../../create-service-history'
import { Table, TableBody } from '@/components/ui/table'
import { DataTable } from '@/components/data-table'
import { ShowDate } from '@/components/show-date'
import { Currency } from '@/components/currency'
import { Actions } from './components/actions'

import type { GetAllServiceHistoryWithDetailsDTO } from '@/dtos/service-history.dto'
import type { TableData } from '../../../../_@types/table-data'
import type { Translations } from '@/@types/translations'

type ServiceHistoryTableProps = {
	serviceHistory: GetAllServiceHistoryWithDetailsDTO
}

export function ServiceHistoryTable(props: ServiceHistoryTableProps) {
	const { serviceHistory } = props
	const t = useTranslations()
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})
	const [sorting, setSorting] = useState<SortingState>([])
	const columns = useMemo(() => getColumns(t), [t])
	const table = useReactTable({
		data: serviceHistory,
		columns,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			pagination,
			columnFilters,
			columnVisibility,
		},
	})

	return (
		<DataTable.Root table={table}>
			<div className="w-full">
				<div className="flex flex-col items-center gap-4 py-4 sm:flex-row">
					<DataTable.Search
						accessorKey="customer.name"
						placeholder={t('dashboard.service-history.list.search-by-customer')}
					/>
					<div className="flex w-full flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
						<DataTable.ColumnFilters
							labels={{
								'service.name': t(
									'dashboard.service-history.list.columns.service_id'
								),
								'customer.name': t(
									'dashboard.service-history.list.columns.customer_id'
								),
								was_paid: t('dashboard.service-history.list.columns.was_paid'),
								charged_amount: t(
									'dashboard.service-history.list.columns.charged_amount'
								),
								done_at: t('dashboard.service-history.list.columns.done_at'),
							}}
						/>
						<CreateService />
					</div>
				</div>
				<Table>
					<DataTable.Header />
					<TableBody>
						<DataTable.Rows />
					</TableBody>
				</Table>
				<div className="flex items-center justify-end space-x-2 py-4">
					<DataTable.Pagination.PreviousPage />
					<DataTable.Pagination.NextPage />
				</div>
			</div>
		</DataTable.Root>
	)
}

const getColumns: (t: Translations) => ColumnDef<TableData>[] = (
	t: Translations
) => {
	return [
		{
			id: 'service.name',
			accessorKey: 'service.name',
			header: ({ column }) => {
				return (
					<DataTable.SortableHead
						label={t('dashboard.service-history.list.columns.service_id')}
						column={column}
					/>
				)
			},
			cell: ({ row }) => row.getValue('service.name'),
		},
		{
			id: 'customer.name',
			accessorKey: 'customer.name',
			header: ({ column }) => {
				return (
					<DataTable.SortableHead
						label={t('dashboard.service-history.list.columns.customer_id')}
						column={column}
					/>
				)
			},
			cell: ({ row }) => row.getValue('customer.name'),
		},
		{
			accessorKey: 'was_paid',
			header: () => (
				<div>{t('dashboard.service-history.list.columns.was_paid')}</div>
			),
			cell: ({ row }) => {
				const wasPaid = row.getValue('was_paid') as boolean
				return wasPaid ? t('boolean-answer.true') : t('boolean-answer.false')
			},
		},
		{
			accessorKey: 'charged_amount',
			header: ({ column }) => {
				return (
					<DataTable.SortableHead
						label={t('dashboard.service-history.list.columns.charged_amount')}
						column={column}
					/>
				)
			},
			cell: ({ row }) => <Currency value={row.getValue('charged_amount')} />,
		},
		{
			accessorKey: 'done_at',
			header: ({ column }) => {
				return (
					<DataTable.SortableHead
						label={t('dashboard.service-history.list.columns.done_at')}
						column={column}
					/>
				)
			},
			cell: ({ row }) => <ShowDate date={row.getValue('done_at')} />,
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => <Actions service={row.original} />,
		},
	]
}
