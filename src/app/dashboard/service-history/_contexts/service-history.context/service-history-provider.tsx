'use client'

import { useCallback, useState, type PropsWithChildren } from 'react'

import { DeleteServiceHistory } from '../../_components/delete-service-history'
import { UpdateServiceHistory } from '../../_components/update-service-history'
import { ViewServiceHistory } from '../../_components/view-service-history'
import { ServiceHistoryContext } from './service-history.context'

import { useBoolean } from '@/hooks/use-boolean'
import type { TableData } from '../../_@types/table-data'

export function ServiceHistoryProvider(props: PropsWithChildren) {
	const { children } = props
	const [selectedServiceHistory, setSelectedServiceHistory] =
		useState<TableData | null>(null)
	const {
		value: isOpenUpdateServiceHistory,
		setValue: setIsOpenUpdateServiceHistory,
		setFalse: closeUpdateServiceHistory,
	} = useBoolean(false)
	const {
		value: isOpenViewServiceHistory,
		setValue: setIsOpenViewServiceHistory,
		setFalse: closeViewServiceHistory,
	} = useBoolean(false)
	const {
		value: isOpenCreateServiceHistory,
		setValue: setIsOpenCreateServiceHistory,
		setFalse: closeCreateServiceHistory,
	} = useBoolean(false)
	const {
		value: isOpenDeleteServiceHistory,
		setValue: setIsOpenDeleteServiceHistory,
		setFalse: closeDeleteServiceHistory,
	} = useBoolean(false)

	const openUpdateServiceHistory = useCallback(
		(serviceHistory: TableData) => {
			setSelectedServiceHistory(serviceHistory)
			setIsOpenUpdateServiceHistory(true)
		},
		[setIsOpenUpdateServiceHistory]
	)

	const openViewServiceHistory = useCallback(
		(serviceHistory: TableData) => {
			setSelectedServiceHistory(serviceHistory)
			setIsOpenViewServiceHistory(true)
		},
		[setIsOpenViewServiceHistory]
	)

	const openDeleteServiceHistory = useCallback(
		(serviceHistory: TableData) => {
			setSelectedServiceHistory(serviceHistory)
			setIsOpenDeleteServiceHistory(true)
		},
		[setIsOpenDeleteServiceHistory]
	)

	return (
		<ServiceHistoryContext.Provider
			value={{
				isOpenUpdateServiceHistory,
				setIsOpenUpdateServiceHistory,
				openUpdateServiceHistory,
				closeUpdateServiceHistory,

				isOpenViewServiceHistory,
				setIsOpenViewServiceHistory,
				openViewServiceHistory,
				closeViewServiceHistory,

				isOpenDeleteServiceHistory,
				setIsOpenDeleteServiceHistory,
				openDeleteServiceHistory,
				closeDeleteServiceHistory,

				isOpenCreateServiceHistory,
				setIsOpenCreateServiceHistory,
				closeCreateServiceHistory,
			}}
		>
			{selectedServiceHistory && (
				<UpdateServiceHistory serviceHistoryId={selectedServiceHistory.id} />
			)}
			{selectedServiceHistory && (
				<ViewServiceHistory serviceHistoryId={selectedServiceHistory.id} />
			)}
			{selectedServiceHistory && (
				<DeleteServiceHistory serviceHistoryId={selectedServiceHistory.id} />
			)}
			{children}
		</ServiceHistoryContext.Provider>
	)
}
