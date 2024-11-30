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
import { CreateService } from '../../../create-customer'
import { DataTable } from '@/components/data-table'
import { Actions } from './components/actions'

import type { TableData } from '../../../../_@types/table-data'
import type { GetCustomersDTO } from '@/dtos/customer.dto'
import type { Translations } from '@/@types/translations'

type CustomersTableProps = {
	customers: GetCustomersDTO
}

export function CustomersTable(props: CustomersTableProps) {
	const { customers } = props
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
		data: customers,
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
						placeholder={t('dashboard.customers.list.search-by-name')}
					/>
					<div className="flex w-full flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
						<DataTable.ColumnFilters<TableData> labels={{}} />
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	t: Translations
) => {
	return [
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => <Actions customer={row.original} />,
		},
	]
}
