import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

import { TSignInSchema } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */
interface UseSignInProps {
  redirect?: string
  setErrorSignIn: Dispatch<SetStateAction<string | undefined>>
  handleOnSuccess?: () => void
}

export function useSignIn({ redirect, setErrorSignIn, handleOnSuccess }: UseSignInProps) {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: TSignInSchema) => {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (!res?.ok) {
        // Throw the error to be caught by onError
        throw new Error(res?.error || 'Unknown error')
      }
      return res
    },
    onSuccess: () => {
      handleOnSuccess?.()
      if (redirect) router.push(redirect)
    },
    onError: (err: any) => {
      setErrorSignIn(err.message)
    },
  })
}
/** onSuccess si necesitas manejar el éxito.
    onError si necesitas manejar el error.
    onSettled se ejecuta siempre, haya éxito o error. */
