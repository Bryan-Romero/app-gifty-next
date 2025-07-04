import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { getAllIDsFavorites } from '@/services'
import { KeysEnum } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useAllIDsFavorites() {
  const { data: session } = useSession()
  const token = session?.tokens?.access_token ?? null

  return useQuery({
    queryKey: [KeysEnum.Favorites_IDs],
    queryFn: () => getAllIDsFavorites(token),
    initialData: [],
    enabled: !!token, // 🔥 Solo ejecuta la query si hay un token válido
    // El operador !! en JavaScript es una forma rápida de convertir un valor en un booleano
  })
}
