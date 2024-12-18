import { useQuery } from '@tanstack/react-query'

import { getServiceHistoryWithDetailsById } from '../../_actions/service-history-action'
import { QUERY_KEYS } from '@/constants/keys'

export function useGetServiceHistoryWithDetailsById(serviceId: string) {
	const { data: serviceHistory, isLoading: isLoadingServiceHistory } = useQuery(
		{
			queryFn: () => getServiceHistoryWithDetailsById(serviceId),
			queryKey: [QUERY_KEYS.GET_SERVICE, serviceId],
			throwOnError: true,
			refetchOnWindowFocus: false,
			gcTime: 0,
			staleTime: 0,
		}
	)
	return { serviceHistory, isLoadingServiceHistory }
}
