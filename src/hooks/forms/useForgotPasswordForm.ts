import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { emailSchema, TEmailSchema } from '@/types'
import { useForgotPassword } from '../useServices/useForgotPassword'

export function useForgotPasswordForm() {
  const [errorForgotPassword, setErrorForgotPassword] = useState<string>()
  const form = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  })
  const { setError } = form

  const forgotPasswordMutation = useForgotPassword({
    setError,
    setErrorForgotPassword,
  })

  return {
    form,
    errorForgotPassword,
    setErrorForgotPassword,
    isSubmitting: forgotPasswordMutation.isPending,
    isSuccess: forgotPasswordMutation.isSuccess,
    onSubmit: (data: TEmailSchema) => forgotPasswordMutation.mutateAsync(data),
  }
}
