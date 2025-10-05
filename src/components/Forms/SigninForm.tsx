'use client'

import { useState } from 'react'
import { Form, Input, Link } from '@heroui/react'

import { CircleExclamationIcon, EnvelopeIcon } from '@/components/Icons'
import { SigninState } from '@/lib/validations/signin.schema'
import { ErrorEnum } from '@/types'
import { PasswordVisibilityToggle } from '../PasswordVisibilityToggle'

interface SignInFormProps {
  formId: string
  state: SigninState
  formAction: (payload: FormData) => void
  isPending: boolean
}

export function SigninForm({ formAction, formId, isPending, state }: SignInFormProps) {
  const [isVisible, setIsVisible] = useState(false)

  if (state?.errors?.message === ErrorEnum.UnverifiedEmail) {
    return (
      <>
        <CircleExclamationIcon className="mb-4" color="#fb923c" size="5x" />
        <p className="text-base font-medium text-gray-500">
          Your email is not verified. Please check your inbox for a verification email.
        </p>
      </>
    )
  }

  return (
    <Form action={formAction} id={formId} validationErrors={state?.errors}>
      {state?.errors?.message && <p className="w-full text-center text-base text-red-400">{state.errors.message}</p>}
      <Input
        autoComplete="email"
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.email}
        endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
        isDisabled={isPending}
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
      />
      <Input
        autoComplete="current-password"
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.password}
        endContent={<PasswordVisibilityToggle isVisible={isVisible} onToggle={() => setIsVisible((v) => !v)} />}
        isDisabled={isPending}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={isVisible ? 'text' : 'password'}
        variant="bordered"
      />

      <div className="flex justify-between">
        {/* <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox> */}
        <Link color="primary" href="/auth/forgot-password" isDisabled={isPending} size="sm" target="_blank">
          Forgot password?
        </Link>
      </div>
    </Form>
  )
}
