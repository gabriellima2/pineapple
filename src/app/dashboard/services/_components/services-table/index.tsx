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

import { Table, TableBody } from '@/components/ui/table'
import { DataTable } from '@/components/data-table'
import { CreateService } from '../create-service'
import { Currency } from '@/components/currency'
import { Actions } from './components/actions'

import type { Translations } from '@/@types/translations'
import type { GetServicesDTO } from '@/dtos/service.dto'
import type { TableData } from './@types/table-data'

type ServicesTableProps = {
	services: GetServicesDTO
}

export function ServicesTable(props: ServicesTableProps) {
	const { services } = props
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
		data: services,
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
						placeholder={t('dashboard.services.list.search-by-name')}
					/>
					<div className="flex w-full flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
						<DataTable.ColumnFilters<TableData>
							labels={{
								name: t('dashboard.services.list.columns.name'),
								base_price: t('dashboard.services.list.columns.base_price'),
								description: t('dashboard.services.list.columns.description'),
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
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<DataTable.SortableHead
						label={t('dashboard.services.list.columns.name')}
						column={column}
					/>
				)
			},
			cell: ({ row }) => row.getValue('name'),
		},
		{
			accessorKey: 'base_price',
			header: () => (
				<div>{t('dashboard.services.list.columns.base_price')}</div>
			),
			cell: ({ row }) => <Currency value={row.getValue('base_price')} />,
		},
		{
			accessorKey: 'description',
			header: () => (
				<div>{t('dashboard.services.list.columns.description')}</div>
			),
			cell: ({ row }) => row.getValue('description') || 'N/A',
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => <Actions service={row.original} />,
		},
	]
}
