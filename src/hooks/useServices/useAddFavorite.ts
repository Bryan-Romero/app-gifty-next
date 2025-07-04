import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addFavorite } from '@/services'
import { KeysEnum } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-favorites'],
    mutationFn: addFavorite,
    onSuccess: (data, { gifId }) => {
      // queryClient.setQueryData([queryKey], (oldFavorites: [] = []) => [
      //   ...oldFavorites,
      //   gifId,
      // ]); // 🔥 Agrega el ID al array
      queryClient.invalidateQueries({
        queryKey: [KeysEnum.Favorites_IDs],
      }) // Asegura que los datos se refresquen en segundo plano
      queryClient.invalidateQueries({
        queryKey: [KeysEnum.GifsFavorites],
      }) // Asegura que los datos se refresquen en segundo plano
    },
    onError: () => {
      addToast({
        color: 'danger',
        title: 'Something went wrong',
        description: 'Please try again later.',
        timeout: 3000,
      })
    },
  })
}
