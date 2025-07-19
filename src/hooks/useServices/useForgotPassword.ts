import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'

import { forgotPassword } from '@/services'
import { TEmailSchema } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */
interface UseForgotPasswordProps {
  setError: UseFormSetError<TEmailSchema>
  setErrorForgotPassword: Dispatch<SetStateAction<string | undefined>>
}

export function useForgotPassword({ setError, setErrorForgotPassword }: UseForgotPasswordProps) {
  return useMutation({
    mutationFn: (data: TEmailSchema) => forgotPassword(data),
    onError: (err) => {
      if ('fieldErrors' in err) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TEmailSchema, {
              message: messages.join(', '),
            })
          } else if (typeof messages === 'string') {
            setError(field as keyof TEmailSchema, {
              message: messages,
            })
          }
        })
      } else if (err?.message) {
        // Errores generales
        setErrorForgotPassword(err.message)
      }
    },
  })
}
