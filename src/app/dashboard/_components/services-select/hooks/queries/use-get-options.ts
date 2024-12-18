import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/keys'
import { getServiceOptions } from '@/app/dashboard/services/_actions/service-action'

export function useGetOptions() {
	const { data: options, isLoading: isLoadingOptions } = useQuery({
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
	})
	return { options, isLoadingOptions }
}
