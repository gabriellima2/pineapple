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
	const { value: isOpenUpdateService, setValue: setIsOpenUpdateService } =
		useBoolean(false)
	const { value: isOpenViewService, setValue: setIsOpenViewService } =
		useBoolean(false)

	const openUpdateService = useCallback(
		(service: TableData) => {
			setSelectedService(service)
			setIsOpenUpdateService(true)
		},
		[setIsOpenUpdateService]
	)

	const closeUpdateService = useCallback(() => {
		setSelectedService(null)
		setIsOpenUpdateService(false)
	}, [setIsOpenUpdateService])

	const openViewService = useCallback(
		(service: TableData) => {
			setSelectedService(service)
			setIsOpenViewService(true)
		},
		[setIsOpenViewService]
	)

	const closeViewService = useCallback(() => {
		setSelectedService(null)
		setIsOpenViewService(false)
	}, [setIsOpenViewService])

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
			}}
		>
			{selectedService && <UpdateService serviceId={selectedService.id} />}
			{selectedService && <ViewService serviceId={selectedService.id} />}
			{children}
		</ServicesContext.Provider>
	)
}
