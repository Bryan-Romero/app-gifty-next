'use client'

import { useState } from 'react'
import { Form, Input } from '@heroui/react'
import { UseFormReturn } from 'react-hook-form'

import { TSignUpSchema } from '@/types'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, UserIcon } from '../Icons'

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
      {errorSignUp && <p className="text-center text-base text-red-400">{errorSignUp}</p>}
      <Input
        endContent={<UserIcon size="1x" className="pointer-events-none" />}
        type="text"
        autoFocus
        label="Username"
        placeholder="Enter username"
        variant="bordered"
        isInvalid={!!errors.username}
        color={errors.username ? 'danger' : 'default'}
        errorMessage={errors.username?.message}
        isDisabled={isSubmitting}
        classNames={{ input: 'text-base' }}
        {...register('username', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        endContent={<EnvelopeIcon size="1x" className="pointer-events-none" />}
        type="email"
        label="Email"
        placeholder="Enter email"
        variant="bordered"
        isInvalid={!!errors.email}
        color={errors.email ? 'danger' : 'default'}
        errorMessage={errors.email?.message}
        isDisabled={isSubmitting}
        classNames={{ input: 'text-base' }}
        {...register('email', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setIsVisibleP((v) => !v)}>
            {isVisibleP ? (
              <EyeSlashIcon size="1x" className="pointer-events-none" />
            ) : (
              <EyeIcon size="1x" className="pointer-events-none" />
            )}
          </button>
        }
        type={isVisibleP ? 'text' : 'password'}
        label="Password"
        placeholder="Enter password"
        variant="bordered"
        isInvalid={!!errors.password}
        color={errors.password ? 'danger' : 'default'}
        errorMessage={errors.password?.message}
        isDisabled={isSubmitting}
        classNames={{ input: 'text-base' }}
        {...register('password', { onChange: () => setErrorSignUp('') })}
      />
      <Input
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setIsVisibleCP((v) => !v)}>
            {isVisibleP ? (
              <EyeSlashIcon size="1x" className="pointer-events-none" />
            ) : (
              <EyeIcon size="1x" className="pointer-events-none" />
            )}
          </button>
        }
        type={isVisibleCP ? 'text' : 'password'}
        label="Confirm Password"
        placeholder="Confirm your password"
        variant="bordered"
        isInvalid={!!errors.confirmPassword}
        color={errors.confirmPassword ? 'danger' : 'default'}
        errorMessage={errors.confirmPassword?.message}
        isDisabled={isSubmitting}
        classNames={{ input: 'text-base' }}
        {...register('confirmPassword', { onChange: () => setErrorSignUp('') })}
      />
    </Form>
  )
}
