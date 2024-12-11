import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/keys'
import { getServiceOptions } from '../../services/_actions/service-action'

export function useGetServiceSelectOptions() {
	const {
		data: serviceSelectOptions,
		isLoading: isLoadingServiceSelectOptions,
	} = useQuery({
		queryFn: getServiceOptions,
		select: (data): Option[] | [] => {
			if (!data) return []
			return data.map((service) => ({
				value: service.id,
				label: service.name,
			}))
		},
		queryKey: [QUERY_KEYS.GET_SERVICE_SELECT_OPTIONS],
		throwOnError: true,
		refetchOnWindowFocus: false,
		gcTime: 0,
		staleTime: 0,
	})
	return { serviceSelectOptions, isLoadingServiceSelectOptions }
}
