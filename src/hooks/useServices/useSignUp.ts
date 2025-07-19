import { Dispatch, SetStateAction } from 'react'
import { addToast } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'

import { signUp } from '@/services/apiRes/signUp'
import { TSignUpSchema } from '@/types/schemas/signUp'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

interface UseSignUpProps {
  redirect?: string
  setError: UseFormSetError<TSignUpSchema>
  setErrorSignUp: Dispatch<SetStateAction<string | undefined>>
  handleOnSuccess?: () => void
}

export function useSignUp({ setError, setErrorSignUp, handleOnSuccess }: UseSignUpProps) {
  return useMutation({
    mutationFn: async (props: TSignUpSchema) => signUp(props),
    onSuccess: () => {
      handleOnSuccess?.()
      addToast({
        color: 'success',
        title: 'Account created',
        description: 'Please verify your email',
        timeout: 10000,
      })
    },
    onError: (err) => {
      if ('fieldErrors' in err) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TSignUpSchema, {
              message: messages.join(', '),
            })
          } else if (typeof messages === 'string') {
            setError(field as keyof TSignUpSchema, { message: messages })
          }
        })
      } else if (err?.message) {
        // Errores generales
        setErrorSignUp(err.message)
      }
    },
  })
}
/** onSuccess si necesitas manejar el éxito.
    onError si necesitas manejar el error.
    onSettled se ejecuta siempre, haya éxito o error. */
