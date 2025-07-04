import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { emailSchema, TEmailSchema } from '@/types'
import { useResendEmail } from '../useServices/useResendEmail'

export function useResendEmailForm() {
  const [errorResendEmail, setErrorResendEmail] = useState<string>()
  const form = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  })
  const { setError } = form

  const resendEmailMutation = useResendEmail({
    setError,
    setErrorResendEmail,
  })

  return {
    form,
    errorResendEmail,
    setErrorResendEmail,
    isSubmitting: resendEmailMutation.isPending,
    isSuccess: resendEmailMutation.isSuccess,
    onSubmit: (data: TEmailSchema) => resendEmailMutation.mutateAsync(data),
  }
}
