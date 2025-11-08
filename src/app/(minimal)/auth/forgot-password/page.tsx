'use client'

import { useActionState, useEffect } from 'react'
import { Button, Form, Input, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon, EnvelopeIcon } from '@/components/Icons'
import { forgotPassword } from '@/lib/actions/forgotPassword'

export default function Page() {
  const formId = 'forgot-password-form'
  const [state, formAction, isPending] = useActionState(forgotPassword, {})

  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(() => {
        window.close()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [state?.success])

  return (
    <CardMinimal
      body={
        state?.success ? (
          <>
            <CircleCheckIcon className="mb-4" color="#22c55e" size="5x" />
            <p className="text-center text-lg font-semibold text-green-600">Email sent!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to change your password.</p>
          </>
        ) : (
          <>
            <Form action={formAction} id={formId} validationErrors={state?.errors}>
              {state?.message && <p className="w-full text-center text-base text-red-400">{state.message}</p>}
              <Input
                autoFocus
                classNames={{ input: 'text-base' }}
                endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
                isDisabled={isPending}
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
            </Form>
          </>
        )
      }
      footer={
        state?.success ? (
          <Button as={Link} color="primary" href="/" variant="flat">
            Home
          </Button>
        ) : (
          <Button color="primary" form={formId} isDisabled={isPending} isLoading={isPending} type="submit">
            Send Email
          </Button>
        )
      }
      title="Forgot your password?"
    />
  )
}
