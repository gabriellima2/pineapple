'use client'

import { useCallback, useState, type PropsWithChildren } from 'react'

import { UpdateService } from '../../_components/update-service'
import { ViewService } from '../../_components/view-service'
import { ServicesContext } from './services.context'

import { useBoolean } from '@/hooks/use-boolean'
import type { TableData } from '../../_@types/table-data'

export function ServicesProvider(props: PropsWithChildren) {
	const { children } = props
	const [selectedService, setSelectedService] = useState<TableData | null>(null)
	const {
		value: isOpenUpdateService,
		setValue: setIsOpenUpdateService,
		setFalse: closeUpdateService,
	} = useBoolean(false)
	const {
		value: isOpenViewService,
		setValue: setIsOpenViewService,
		setFalse: closeViewService,
	} = useBoolean(false)
	const {
		value: isOpenCreateService,
		setValue: setIsOpenCreateService,
		setFalse: closeCreateService,
	} = useBoolean(false)

	const openUpdateService = useCallback(
		(service: TableData) => {
			setSelectedService(service)
			setIsOpenUpdateService(true)
		},
		[setIsOpenUpdateService]
	)

	const openViewService = useCallback(
		(service: TableData) => {
			setSelectedService(service)
			setIsOpenViewService(true)
		},
		[setIsOpenViewService]
	)

	return (
		<ServicesContext.Provider
			value={{
				isOpenUpdateService,
				setIsOpenUpdateService,
				openUpdateService,
				closeUpdateService,

				isOpenViewService,
				setIsOpenViewService,
				openViewService,
				closeViewService,

				isOpenCreateService,
				setIsOpenCreateService,
				closeCreateService,
			}}
		>
			{selectedService && <UpdateService serviceId={selectedService.id} />}
			{selectedService && <ViewService serviceId={selectedService.id} />}
			{children}
		</ServicesContext.Provider>
	)
}
