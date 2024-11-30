'use client'

import { createContext } from 'react'
import { CustomersContextValues } from './@types/customers-context-values'

export const CustomersContext = createContext<CustomersContextValues>(
	{} as CustomersContextValues
)
