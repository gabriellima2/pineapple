import type { TableData } from '../../../_@types/table-data'

export type ServicesContextValues = {
	isOpenUpdateService: boolean
	setIsOpenUpdateService: (open: boolean) => void
	closeUpdateService: () => void
	openUpdateService: (service: TableData) => void

	isOpenViewService: boolean
	setIsOpenViewService: (open: boolean) => void
	closeViewService: () => void
	openViewService: (service: TableData) => void

	isOpenCreateService: boolean
	setIsOpenCreateService: (open: boolean) => void
	closeCreateService: () => void
}
