'use client'

import { use, useActionState, useEffect, useState } from 'react'
import { Button, Form, Input, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon } from '@/components/Icons'
import { PasswordVisibilityToggle } from '@/components/PasswordVisibilityToggle'
import { resetPassword } from '@/lib/actions/resetPassword'

export default function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const token = use(searchParams).token
  const formId = 'reset-password-form'
  const [isVisibleP, setIsVisibleP] = useState(false)
  const [isVisibleCP, setIsVisibleCP] = useState(false)
  const [state, formAction, isPending] = useActionState(resetPassword, {
    data: { token },
  })

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
            <p className="text-center text-lg font-semibold text-green-600">Password reset!</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              You will now be able to log in to your account using the updated credentials.
            </p>
          </>
        ) : (
          <>
            <Form action={formAction} id={formId} validationErrors={state?.errors}>
              {state?.message && <p className="w-full text-center text-base text-red-400">{state?.message}</p>}
              <Input
                classNames={{ input: 'text-base' }}
                endContent={
                  <PasswordVisibilityToggle isVisible={isVisibleP} onToggle={() => setIsVisibleP((v) => !v)} />
                }
                isDisabled={isPending}
                label="Password"
                name="password"
                placeholder="Enter password"
                type={isVisibleP ? 'text' : 'password'}
                variant="bordered"
              />
              <Input
                classNames={{ input: 'text-base' }}
                endContent={
                  <PasswordVisibilityToggle isVisible={isVisibleCP} onToggle={() => setIsVisibleCP((v) => !v)} />
                }
                isDisabled={isPending}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isVisibleCP ? 'text' : 'password'}
                variant="bordered"
              />
            </Form>
          </>
        )
      }
      footer={
        <>
          <Button as={Link} color="primary" href="/" variant="flat">
            Homepage
          </Button>
          {state?.success ? (
            <Button as={Link} color="success" href="/auth/signin">
              Go to login
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isPending} isLoading={isPending} type="submit">
              Reset password
            </Button>
          )}
        </>
      }
      title="Reset password"
    />
  )
}
