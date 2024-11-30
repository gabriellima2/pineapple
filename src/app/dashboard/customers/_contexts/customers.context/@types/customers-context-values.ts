import type { TableData } from '../../../_@types/table-data'

export type CustomersContextValues = {
	isOpenUpdateCustomer: boolean
	setIsOpenUpdateCustomer: (open: boolean) => void
	closeUpdateCustomer: () => void
	openUpdateCustomer: (customer: TableData) => void

	isOpenViewCustomer: boolean
	setIsOpenViewCustomer: (open: boolean) => void
	closeViewCustomer: () => void
	openViewCustomer: (customer: TableData) => void

	isOpenDeleteCustomer: boolean
	setIsOpenDeleteCustomer: (open: boolean) => void
	closeDeleteCustomer: () => void
	openDeleteCustomer: (customer: TableData) => void

	isOpenCreateCustomer: boolean
	setIsOpenCreateCustomer: (open: boolean) => void
	closeCreateCustomer: () => void
}
