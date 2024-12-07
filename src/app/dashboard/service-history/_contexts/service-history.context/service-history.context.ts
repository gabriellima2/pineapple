'use client'

import { createContext } from 'react'
import { ServiceHistoryContextValues } from './@types/service-history-context-values'

export const ServiceHistoryContext = createContext<ServiceHistoryContextValues>(
	{} as ServiceHistoryContextValues
)
