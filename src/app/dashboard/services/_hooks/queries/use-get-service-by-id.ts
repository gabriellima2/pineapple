import { useQuery } from '@tanstack/react-query'

import { getServiceById } from '../../_actions/service-action'
import { QUERY_KEYS } from '@/constants/keys'

export function useGetServiceById(serviceId: string) {
	const { data: service, isLoading: isLoadingService } = useQuery({
		queryFn: () => getServiceById(serviceId),
		queryKey: [QUERY_KEYS.GET_SERVICE, serviceId],
		throwOnError: true,
		refetchOnWindowFocus: false,
		gcTime: 0,
		staleTime: 0,
	})
	return { service, isLoadingService }
}
