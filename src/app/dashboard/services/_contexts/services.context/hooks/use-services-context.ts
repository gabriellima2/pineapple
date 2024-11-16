'use client'

import { useContext } from 'react'

import { ServicesContext } from '../services.context'
import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

export function useServicesContext() {
	const context = useContext(ServicesContext)
	if (!context) {
		throw new ContextWithoutProviderException(
			'ServicesContext',
			'ServicesProvider'
		)
	}
	return context
}
