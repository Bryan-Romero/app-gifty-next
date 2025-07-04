import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'

import { resetPassword } from '@/services'
import { TResetPasswordSchema } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */
interface UseResetPasswordProps {
  setError: UseFormSetError<TResetPasswordSchema>
  setErrorResetPassword: Dispatch<SetStateAction<string | undefined>>
}

export function useResetPassword({ setError, setErrorResetPassword }: UseResetPasswordProps) {
  return useMutation({
    mutationFn: (data: TResetPasswordSchema & { token: string }) => resetPassword(data),
    onError: (err: any) => {
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TResetPasswordSchema, {
              message: messages.join(', '),
            })
          } else if (typeof messages === 'string') {
            setError(field as keyof TResetPasswordSchema, {
              message: messages,
            })
          }
        })
      } else if (err?.message) {
        // Errores generales
        setErrorResetPassword(err.message)
      }
    },
  })
}
