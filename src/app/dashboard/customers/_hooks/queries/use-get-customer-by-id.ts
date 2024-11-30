import { useQuery } from '@tanstack/react-query'

import { getCustomerById } from '../../_actions/customer-action'
import { QUERY_KEYS } from '@/constants/keys'

export function useGetCustomerById(customerId: string) {
	const { data: customer, isLoading: isLoadingCustomer } = useQuery({
		queryFn: () => getCustomerById(customerId),
		queryKey: [QUERY_KEYS.GET_CUSTOMER, customerId],
		throwOnError: true,
		refetchOnWindowFocus: false,
		gcTime: 0,
		staleTime: 0,
	})
	return { customer, isLoadingCustomer }
}
