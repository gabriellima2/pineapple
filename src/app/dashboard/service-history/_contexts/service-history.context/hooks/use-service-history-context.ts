'use client'

import { useContext } from 'react'

import { ServiceHistoryContext } from '../service-history.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

export function useServiceHistoryContext() {
	const context = useContext(ServiceHistoryContext)
	if (!context) {
		throw new ContextWithoutProviderException(
			'ServiceHistoryContext',
			'ServiceHistoryProvider'
		)
	}
	return context
}
