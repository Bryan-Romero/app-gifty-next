import { useQuery } from '@tanstack/react-query'

import { getGifByID } from '@/services'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useGifByID(gif_id: string) {
  const {
    data: gif,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['gif-by-id', gif_id],
    queryFn: () => getGifByID(gif_id),
  })

  return {
    gif,
    isLoading,
    isError,
  }
}
