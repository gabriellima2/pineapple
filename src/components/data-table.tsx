import { createContext, Fragment, PropsWithChildren, useContext } from 'react'
import Link from 'next/link'
import { flexRender, type Column, type Table } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
	TableCell,
	TableRow,
	TableHead,
	TableHeader,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

type DefaultProps<TData> = {
	table: Table<TData>
}

type PaginationButtonDefaultProps = Omit<
	Parameters<typeof Button>[0],
	'variant' | 'size' | 'onClick' | 'disabled' | 'children'
>

type DataTableContextValues = { table: Table<unknown> }

const DataTableContext = createContext<DataTableContextValues>(
	{} as DataTableContextValues
)

function useDataTableContext() {
	const context = useContext(DataTableContext)
	if (!context) {
		throw new ContextWithoutProviderException(
			'DataTableContext',
			'DataTable.Root'
		)
	}
	return context
}

function Root<TData>(props: DefaultProps<TData> & PropsWithChildren) {
	const { table, children } = props
	return (
		<DataTableContext.Provider value={{ table: table as Table<unknown> }}>
			{children}
		</DataTableContext.Provider>
	)
}

function Header() {
	const { table } = useDataTableContext()
	const headerGroups = table.getHeaderGroups()
	return (
		<TableHeader>
			{headerGroups.map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const columnRelativeDepth = header.depth - header.column.depth

						if (
							!header.isPlaceholder &&
							columnRelativeDepth > 1 &&
							header.id === header.column.id
						) {
							return null
						}

						let rowSpan = 1
						if (header.isPlaceholder) {
							const leafs = header.getLeafHeaders()
							rowSpan = leafs[leafs.length - 1].depth - header.depth
						}

						return (
							<TableHead
								key={header.id}
								colSpan={header.colSpan}
								rowSpan={rowSpan}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							</TableHead>
						)
					})}
				</TableRow>
			))}
		</TableHeader>
	)
}

type RowsProps<TData> = {
	renderSubRow?: (props: { row: TData }) => React.ReactElement
}

function Rows<TData>(props: RowsProps<TData>) {
	const { renderSubRow } = props
	const { table } = useDataTableContext()
	const { rows } = table.getRowModel()
	return (
		<>
			{rows && rows.length ? (
				rows.map((row) => {
					const visibleCells = row.getVisibleCells()
					return (
						<Fragment key={row.id}>
							<TableRow>
								{visibleCells.map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
							{row.getIsExpanded() && renderSubRow && (
								<TableRow>
									<TableCell colSpan={visibleCells.length} className="p-4">
										{renderSubRow({ row: row.original as TData })}
									</TableCell>
								</TableRow>
							)}
						</Fragment>
					)
				})
			) : (
				<EmptyMessage />
			)}
		</>
	)
}

function Footer() {
	const { table } = useDataTableContext()
	const footer = table.getFooterGroups()
	const bodyRowsLength = table.getRowModel().rows.length
	if (!bodyRowsLength) return null
	return (
		<>
			{footer.map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<TableHead key={header.id}>
							{header.isPlaceholder
								? null
								: flexRender(
										header.column.columnDef.footer,
										header.getContext()
									)}
						</TableHead>
					))}
				</TableRow>
			))}
		</>
	)
}

type SortableHeadProps<TData> = Omit<
	Parameters<typeof Button>[0],
	'variant' | 'onClick' | 'children'
> & {
	column: Column<TData>
	label: string
	className?: string
}

function SortableHead<TData>(props: SortableHeadProps<TData>) {
	const { label, column, ...rest } = props
	return (
		<Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			{...rest}
		>
			{label}
			<ArrowUpDown />
		</Button>
	)
}

type SearchProps = Omit<Parameters<typeof Input>[0], 'value' | 'onChange'>

function Search(props: SearchProps) {
	const { className, ...rest } = props
	const { table } = useDataTableContext()
	return (
		<Input
			value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
			onChange={(event) =>
				table.getColumn('name')?.setFilterValue(event.target.value)
			}
			className={cn('sm:max-w-sm', className)}
			{...rest}
		/>
	)
}

function EmptyMessage() {
	const { table } = useDataTableContext()
	const headerGroups = table.getHeaderGroups()
	const lastHeaderGroup = headerGroups[headerGroups.length - 1]
	const headersLength = lastHeaderGroup.headers.length
	return (
		<TableRow>
			<TableCell
				colSpan={headersLength}
				className="h-24 text-center normal-case"
			>
				Nenhum resultado encontrado
			</TableCell>
		</TableRow>
	)
}

function ColumnFilters() {
	const { table } = useDataTableContext()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="ml-auto flex-1 sm:flex-none">
					Colunas <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

type ActionsProps = {
	actions: {
		label: string
		onClick?: () => unknown
		href?: string
		separator?: boolean
	}[]
}

function Actions(props: ActionsProps) {
	const { actions } = props
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Abrir menu</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Ações</DropdownMenuLabel>
				{actions.map((action, i) => (
					<Fragment key={i}>
						{action.href ? (
							<DropdownMenuItem asChild>
								<Link href={action.href}>{action.label}</Link>
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem onClick={action.onClick}>
								{action.label}
							</DropdownMenuItem>
						)}
						{action.separator && <DropdownMenuSeparator />}
					</Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function NextPage(props: PaginationButtonDefaultProps) {
	const { table } = useDataTableContext()
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
			{...props}
		>
			Próximo
		</Button>
	)
}

function PreviousPage(props: PaginationButtonDefaultProps) {
	const { table } = useDataTableContext()
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
			{...props}
		>
			Anterior
		</Button>
	)
}

export const DataTable = {
	Root,
	Header,
	Rows,
	Footer,
	EmptyMessage,
	SortableHead,
	Search,
	ColumnFilters,
	Actions,
	Pagination: {
		NextPage,
		PreviousPage,
	},
}
