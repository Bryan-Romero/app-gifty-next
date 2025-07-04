import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'

import { getResendEmail } from '@/services'
import { TEmailSchema } from '@/types'

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */
interface UseResendEmailProps {
  setError: UseFormSetError<TEmailSchema>
  setErrorResendEmail: Dispatch<SetStateAction<string | undefined>>
}

export function useResendEmail({ setError, setErrorResendEmail }: UseResendEmailProps) {
  return useMutation({
    mutationFn: (data: TEmailSchema) => getResendEmail(data),
    onError: (err: any) => {
      if (err.fieldErrors) {
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
        setErrorResendEmail(err.message)
      }
    },
  })
}
