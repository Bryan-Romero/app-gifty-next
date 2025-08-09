'use client'

import { useState } from 'react'
import { Form, Input } from '@heroui/react'
import { UseFormReturn } from 'react-hook-form'

import { TSignUpSchema } from '@/types'
import { EnvelopeIcon, UserIcon } from '../Icons'
import { PasswordVisibilityToggle } from '../PasswordVisibilityToggle'

interface SignUpFormProps {
  form: UseFormReturn<TSignUpSchema>
  errorSignUp?: string
  isSubmitting?: boolean
  setErrorSignUp: (msg: string) => void
  onSubmit: (data: TSignUpSchema) => void
  formId: string
}

export function SignUpForm({ form, errorSignUp, isSubmitting, setErrorSignUp, onSubmit, formId }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [isVisibleP, setIsVisibleP] = useState(false)
  const [isVisibleCP, setIsVisibleCP] = useState(false)

  return (
    <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
      {errorSignUp && <p className="w-full text-center text-base text-red-400">{errorSignUp}</p>}
      <Input
        autoFocus
        classNames={{ input: 'text-base' }}
        color={errors.username ? 'danger' : 'default'}
        endContent={<UserIcon className="pointer-events-none" size="1x" />}
        errorMessage={errors.username?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.username}
        label="Username"
        placeholder="Enter username"
        type="text"
        variant="bordered"
        {...register('username', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        classNames={{ input: 'text-base' }}
        color={errors.email ? 'danger' : 'default'}
        endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
        errorMessage={errors.email?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.email}
        label="Email"
        placeholder="Enter email"
        type="email"
        variant="bordered"
        {...register('email', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        classNames={{ input: 'text-base' }}
        color={errors.password ? 'danger' : 'default'}
        endContent={<PasswordVisibilityToggle isVisible={isVisibleP} onToggle={() => setIsVisibleP((v) => !v)} />}
        errorMessage={errors.password?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.password}
        label="Password"
        placeholder="Enter password"
        type={isVisibleP ? 'text' : 'password'}
        variant="bordered"
        {...register('password', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        classNames={{ input: 'text-base' }}
        color={errors.confirmPassword ? 'danger' : 'default'}
        endContent={<PasswordVisibilityToggle isVisible={isVisibleCP} onToggle={() => setIsVisibleCP((v) => !v)} />}
        errorMessage={errors.confirmPassword?.message}
        isDisabled={isSubmitting}
        isInvalid={!!errors.confirmPassword}
        label="Confirm Password"
        placeholder="Confirm your password"
        type={isVisibleCP ? 'text' : 'password'}
        variant="bordered"
        {...register('confirmPassword', { onChange: () => setErrorSignUp('') })}
      />
    </Form>
  )
}
