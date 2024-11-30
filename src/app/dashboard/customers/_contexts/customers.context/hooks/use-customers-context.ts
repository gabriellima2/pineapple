'use client'

import { useContext } from 'react'

import { CustomersContext } from '../customers.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

export function useCustomersContext() {
	const context = useContext(CustomersContext)
	if (!context) {
		throw new ContextWithoutProviderException(
			'CustomersContext',
			'CustomersProvider'
		)
	}
	return context
}
