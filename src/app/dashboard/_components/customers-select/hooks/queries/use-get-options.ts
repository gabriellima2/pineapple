import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/keys'
import { getCustomerOptions } from '@/app/dashboard/customers/_actions/customer-action'

export function useGetOptions() {
	const { data: options, isLoading: isLoadingOptions } = useQuery({
		queryFn: getCustomerOptions,
		select: (data): Option[] | [] => {
			if (!data) return []
			return data.map((customer) => ({
				value: customer.id,
				label: customer.name,
			}))
		},
		queryKey: [QUERY_KEYS.GET_CUSTOMER_SELECT_OPTIONS],
		throwOnError: true,
		refetchOnWindowFocus: false,
		gcTime: 0,
		staleTime: 0,
	})
	return { options, isLoadingOptions }
}
