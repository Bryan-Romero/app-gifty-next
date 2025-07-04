import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeFavorite } from '@/services'
import { KeysEnum } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['remove-favorites'],
    mutationFn: removeFavorite,
    onSuccess: (data, { gifId }) => {
      // queryClient.setQueryData([queryKey], (oldFavorites: [] = []) => {
      //   return oldFavorites.filter((id) => id !== gifId); // 🔥 Remueve el ID del array
      // });
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
