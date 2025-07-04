import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signInSchema, TSignInSchema } from '@/types'
import { useSignIn } from '../useServices/useSignIn'

interface UseSignInFormProps {
  redirect?: string
  onCloseModal?: () => void
}

export function useSignInForm({ redirect, onCloseModal }: UseSignInFormProps = {}) {
  const [errorSignIn, setErrorSignIn] = useState<string>()
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })
  const { reset, clearErrors } = form

  const handleOnClose = () => {
    reset()
    clearErrors()
    setErrorSignIn('')
    onCloseModal?.()
  }

  const signInMutation = useSignIn({
    setErrorSignIn,
    handleOnSuccess: handleOnClose,
    ...(redirect && { redirect }),
  })

  return {
    form,
    errorSignIn,
    setErrorSignIn,
    isSubmitting: signInMutation.isPending,
    isSuccess: signInMutation.isSuccess,
    onSubmit: (data: TSignInSchema) => signInMutation.mutateAsync(data),
    handleOnClose,
  }
}
