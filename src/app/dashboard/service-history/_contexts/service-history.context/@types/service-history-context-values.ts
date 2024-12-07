import type { TableData } from '../../../_@types/table-data'

export type ServiceHistoryContextValues = {
	isOpenUpdateServiceHistory: boolean
	setIsOpenUpdateServiceHistory: (open: boolean) => void
	closeUpdateServiceHistory: () => void
	openUpdateServiceHistory: (serviceHistory: TableData) => void

	isOpenViewServiceHistory: boolean
	setIsOpenViewServiceHistory: (open: boolean) => void
	closeViewServiceHistory: () => void
	openViewServiceHistory: (serviceHistory: TableData) => void

	isOpenDeleteServiceHistory: boolean
	setIsOpenDeleteServiceHistory: (open: boolean) => void
	closeDeleteServiceHistory: () => void
	openDeleteServiceHistory: (serviceHistory: TableData) => void

	isOpenCreateServiceHistory: boolean
	setIsOpenCreateServiceHistory: (open: boolean) => void
	closeCreateServiceHistory: () => void
}
