import { useQuery } from '@tanstack/react-query'

import { getServiceHistoryById } from '../../_actions/service-history-action'
import { QUERY_KEYS } from '@/constants/keys'

export function useGetServiceHistoryById(serviceId: string) {
	const { data: serviceHistory, isLoading: isLoadingServiceHistory } = useQuery(
		{
			queryFn: () => getServiceHistoryById(serviceId),
			queryKey: [QUERY_KEYS.GET_SERVICE_HISTORY, serviceId],
			throwOnError: true,
			refetchOnWindowFocus: false,
			gcTime: 0,
			staleTime: 0,
		}
	)
	return { serviceHistory, isLoadingServiceHistory }
}
