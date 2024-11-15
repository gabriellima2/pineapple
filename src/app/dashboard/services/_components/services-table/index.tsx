'use client'

import { useState } from 'react'
import {
	ColumnDef,
	ColumnFiltersState,
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

import type { GetServicesDTO } from '@/dtos/service.dto'
import type { TableData } from './@types/table-data'

type ServicesTableProps = {
	services: GetServicesDTO
}

export function ServicesTable(props: ServicesTableProps) {
	const { services } = props
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const table = useReactTable({
		data: services,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	})

	return (
		<DataTable.Root table={table}>
			<div className="w-full">
				<div className="flex flex-col items-center gap-4 py-4 sm:flex-row">
					<DataTable.Search placeholder="Buscar por nome..." />
					<div className="flex w-full flex-row flex-wrap items-center gap-4 sm:flex-nowrap">
						<DataTable.ColumnFilters<TableData>
							labels={{
								name: 'Nome',
								base_price: 'Preço',
								description: 'Descrição',
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

const columns: ColumnDef<TableData>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTable.SortableHead label="Nome" column={column} />
		},
		cell: ({ row }) => row.getValue('name'),
	},
	{
		accessorKey: 'base_price',
		header: () => <div>Preço</div>,
		cell: ({ row }) => <Currency value={row.getValue('base_price')} />,
	},
	{
		accessorKey: 'description',
		header: () => <div>Descrição</div>,
		cell: ({ row }) => row.getValue('description') || 'N/A',
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <Actions service={row.original} />,
	},
]
