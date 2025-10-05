'use client'

import { useState } from 'react'
import { Form, Input } from '@heroui/react'

import { SignupState } from '@/lib/validations/signup.schema'
import { EnvelopeIcon, UserIcon } from '../Icons'
import { PasswordVisibilityToggle } from '../PasswordVisibilityToggle'

interface SignUpFormProps {
  formId: string
  state: SignupState
  formAction: (payload: FormData) => void
  isPending: boolean
}

export function SignupForm({ formAction, formId, isPending, state }: SignUpFormProps) {
  const [isVisibleP, setIsVisibleP] = useState(false)
  const [isVisibleCP, setIsVisibleCP] = useState(false)

  return (
    <Form action={formAction} id={formId} validationErrors={state?.errors}>
      {state?.errors?.message && <p className="w-full text-center text-base text-red-400">{state.errors.message[0]}</p>}
      <Input
        autoFocus
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.username}
        endContent={<UserIcon className="pointer-events-none" size="1x" />}
        isDisabled={isPending}
        label="Username"
        name="username"
        placeholder="Enter username"
        type="text"
        variant="bordered"
      />
      <Input
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.email}
        endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
        isDisabled={isPending}
        label="Email"
        name="email"
        placeholder="Enter email"
        type="email"
        variant="bordered"
      />
      <Input
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.password}
        endContent={<PasswordVisibilityToggle isVisible={isVisibleP} onToggle={() => setIsVisibleP((v) => !v)} />}
        isDisabled={isPending}
        label="Password"
        name="password"
        placeholder="Enter password"
        type={isVisibleP ? 'text' : 'password'}
        variant="bordered"
      />
      <Input
        classNames={{ input: 'text-base' }}
        defaultValue={state?.lastSubmittedValues?.confirmPassword}
        endContent={<PasswordVisibilityToggle isVisible={isVisibleCP} onToggle={() => setIsVisibleCP((v) => !v)} />}
        isDisabled={isPending}
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        type={isVisibleCP ? 'text' : 'password'}
        variant="bordered"
      />
    </Form>
  )
}
