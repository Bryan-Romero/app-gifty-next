'use client'

import { useState } from 'react'
import { Form, Input, Link } from '@heroui/react'
import { UseFormReturn } from 'react-hook-form'

import { CircleExclamationIcon, EnvelopeIcon } from '@/components/Icons'
import { ErrorEnum, TSignInSchema } from '@/types'
import { PasswordVisibilityToggle } from '../PasswordVisibilityToggle'

interface SignInFormProps {
  form: UseFormReturn<TSignInSchema>
  errorSignIn?: string
  isSubmitting?: boolean
  setErrorSignIn: (msg: string) => void
  onSubmit: (data: TSignInSchema) => void
  formId: string
}

export function SignInForm({ form, errorSignIn, isSubmitting, setErrorSignIn, onSubmit, formId }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [isVisible, setIsVisible] = useState(false)

  if (errorSignIn === ErrorEnum.UnverifiedEmail) {
    return (
      <>
        <CircleExclamationIcon className="mb-4" color="#fb923c" size="5x" />
        <p className="tex-or text-lg font-medium text-gray-500">
          Your email is not verified. Please check your inbox for a verification email.
        </p>
      </>
    )
  }

  return (
    <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
      {errorSignIn && <p className="w-full text-center text-base text-red-400">{errorSignIn}</p>}
      <Input
        autoFocus
        classNames={{ input: 'text-base' }}
        color={errors.email ? 'danger' : 'default'}
        endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
        errorMessage={errors.email?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.email}
        label="Email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
        {...register('email', { onChange: () => setErrorSignIn('') })}
      />
      <Input
        classNames={{ input: 'text-base' }}
        color={errors.password ? 'danger' : 'default'}
        endContent={<PasswordVisibilityToggle isVisible={isVisible} onToggle={() => setIsVisible((v) => !v)} />}
        errorMessage={errors.password?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.password}
        label="Password"
        placeholder="Enter your password"
        type={isVisible ? 'text' : 'password'}
        variant="bordered"
        {...register('password', { onChange: () => setErrorSignIn('') })}
      />

      <div className="flex justify-between">
        {/* <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox> */}
        <Link color="primary" href="/auth/forgot-password" size="sm" target="_blank">
          Forgot password?
        </Link>
      </div>
    </Form>
  )
}
