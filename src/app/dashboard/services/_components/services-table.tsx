'use client'

import { useMemo, useState } from 'react'
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
import { CreateService } from './create-service'
import { Currency } from '@/components/currency'

export function ServicesTable() {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const table = useReactTable({
		data,
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
						<DataTable.ColumnFilters />
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

type ActionsProps = {
	service: Service
}

function Actions(props: ActionsProps) {
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

const data: Service[] = [
	{
		id: 'm5gr84i9',
		basePrice: 316,
		status: 'paid',
		name: 'Pintura',
		description: null,
	},
	{
		id: '3u1reuv4',
		basePrice: 242,
		status: 'pending',
		name: 'Funilária',
		description: null,
	},
]

type ServiceStatus = 'pending' | 'paid'

const SERVICE_STATUS: Record<ServiceStatus, string> = {
	pending: 'Pendente',
	paid: 'Pago',
}

type Service = {
	id: string
	basePrice: number
	status: ServiceStatus
	name: string
	description: string | null
}

const columns: ColumnDef<Service>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTable.SortableHead label="Nome" column={column} />
		},
		cell: ({ row }) => row.getValue('name'),
	},
	{
		accessorKey: 'basePrice',
		header: () => <div>Preço</div>,
		cell: ({ row }) => <Currency value={row.getValue('basePrice')} />,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => SERVICE_STATUS[row.getValue('status') as ServiceStatus],
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <Actions service={row.original} />,
	},
]
