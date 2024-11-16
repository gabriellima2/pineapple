'use client'

import { createContext } from 'react'
import { ServicesContextValues } from './@types/services-context-values'

export const ServicesContext = createContext<ServicesContextValues>(
	{} as ServicesContextValues
)
