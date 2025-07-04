import { useQuery } from '@tanstack/react-query'

import { getTrendingSearches } from '@/services'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useTrendingSearches() {
  return useQuery({
    queryKey: ['trending-searches'],
    queryFn: () => getTrendingSearches(),
  })
}
