'use client'

import { useCallback, useState, type PropsWithChildren } from 'react'

import { DeleteCustomer } from '../../_components/delete-customer'
import { UpdateCustomer } from '../../_components/update-customer'
import { ViewCustomer } from '../../_components/view-customer'
import { CustomersContext } from './customers.context'

import { useBoolean } from '@/hooks/use-boolean'
import type { TableData } from '../../_@types/table-data'

export function CustomersProvider(props: PropsWithChildren) {
	const { children } = props
	const [selectedCustomer, setSelectedCustomer] = useState<TableData | null>(
		null
	)
	const {
		value: isOpenUpdateCustomer,
		setValue: setIsOpenUpdateCustomer,
		setFalse: closeUpdateCustomer,
	} = useBoolean(false)
	const {
		value: isOpenViewCustomer,
		setValue: setIsOpenViewCustomer,
		setFalse: closeViewCustomer,
	} = useBoolean(false)
	const {
		value: isOpenCreateCustomer,
		setValue: setIsOpenCreateCustomer,
		setFalse: closeCreateCustomer,
	} = useBoolean(false)
	const {
		value: isOpenDeleteCustomer,
		setValue: setIsOpenDeleteCustomer,
		setFalse: closeDeleteCustomer,
	} = useBoolean(false)

	const openUpdateCustomer = useCallback(
		(customer: TableData) => {
			setSelectedCustomer(customer)
			setIsOpenUpdateCustomer(true)
		},
		[setIsOpenUpdateCustomer]
	)

	const openViewCustomer = useCallback(
		(customer: TableData) => {
			setSelectedCustomer(customer)
			setIsOpenViewCustomer(true)
		},
		[setIsOpenViewCustomer]
	)

	const openDeleteCustomer = useCallback(
		(customer: TableData) => {
			setSelectedCustomer(customer)
			setIsOpenDeleteCustomer(true)
		},
		[setIsOpenDeleteCustomer]
	)

	return (
		<CustomersContext.Provider
			value={{
				isOpenUpdateCustomer,
				setIsOpenUpdateCustomer,
				openUpdateCustomer,
				closeUpdateCustomer,

				isOpenViewCustomer,
				setIsOpenViewCustomer,
				openViewCustomer,
				closeViewCustomer,

				isOpenDeleteCustomer,
				setIsOpenDeleteCustomer,
				openDeleteCustomer,
				closeDeleteCustomer,

				isOpenCreateCustomer,
				setIsOpenCreateCustomer,
				closeCreateCustomer,
			}}
		>
			{selectedCustomer && <UpdateCustomer customerId={selectedCustomer.id} />}
			{selectedCustomer && <ViewCustomer customerId={selectedCustomer.id} />}
			{selectedCustomer && <DeleteCustomer customerId={selectedCustomer.id} />}
			{children}
		</CustomersContext.Provider>
	)
}
