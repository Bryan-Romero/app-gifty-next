import { LIMIT } from '@/config'
import { getGifsSearch } from '@/services/giphy-services/getGifsSearch.service'
import { useInfiniteGifs } from './useInfiniteGifs'

export function useGifsSearch(query: string) {
  return useInfiniteGifs({
    queryKey: ['gifs-search'],
    queryFn: ({ pageParam = 0 }) => getGifsSearch({ q: query, offset: pageParam, limit: LIMIT }),
  })
}
