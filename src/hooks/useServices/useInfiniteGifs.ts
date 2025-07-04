import { useEffect, useRef } from 'react'
import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { Gifs } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

type UseInfiniteGifsProps<TParams> = {
  queryKey: any[]
  queryFn: QueryFunction<Gifs, string[], number>
  getQueryParams?: () => TParams
  enabled?: boolean
  deps?: any[]
}

export function useInfiniteGifs<TParams = any>({
  queryKey,
  queryFn,
  enabled = true,
  deps = [],
}: UseInfiniteGifsProps<TParams>) {
  const { ref: scrollTriggerRef, inView } = useInView()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const data = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      const prevOffset = firstPage.pagination.offset - firstPage.pagination.count
      return prevOffset >= 0 ? prevOffset : undefined
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.pagination.offset + lastPage.pagination.count
      return nextOffset >= lastPage.pagination.total_count ? undefined : nextOffset
    },
    enabled,
  })

  useEffect(() => {
    if (inView && data.hasNextPage && !data.isFetchingNextPage) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        data.fetchNextPage()
      }, 300)
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [inView, data.hasNextPage, data.isFetchingNextPage, data.fetchNextPage, ...deps])

  return { ...data, scrollTriggerRef, inView }
}
