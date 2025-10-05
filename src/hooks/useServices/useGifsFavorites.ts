import { useSession } from 'next-auth/react'

import { LIMIT } from '@/config'
import { getFavoriteGifs } from '@/services/api-services/getFavoriteGifs.service'
import { KeysEnum } from '@/types'
import { useInfiniteGifs } from './useInfiniteGifs'

export function useGifsFavorites() {
  const { data: session } = useSession()
  const token = session?.tokens?.access_token ?? null

  return useInfiniteGifs({
    queryKey: [KeysEnum.GifsFavorites],
    queryFn: ({ pageParam = 0 }) =>
      getFavoriteGifs({
        token,
        offset: pageParam,
        limit: LIMIT,
      }),
    enabled: !!token,
  })
}
