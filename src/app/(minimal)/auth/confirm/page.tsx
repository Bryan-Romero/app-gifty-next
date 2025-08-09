'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Link, Spinner } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon, CircleXmarkIcon } from '@/components/Icons'
import { useVerificationEmail } from '@/hooks/useServices/useVerificationEmail'

export default function Page() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { isLoading, isError, error } = useVerificationEmail(token)
  const router = useRouter()

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    )

  return (
    <CardMinimal
      body={
        !isError ? (
          <>
            <CircleCheckIcon className="mb-4" color="#22c55e" size="5x" />
            <p className="text-center text-lg font-semibold text-green-600">¡Confirmed mail!</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Your email has been successfully verified.
              <br />
              You can now login to your account.
            </p>
          </>
        ) : (
          <>
            <CircleXmarkIcon className="mb-4" color="#ef4444" size="5x" />
            <p className="text-center text-lg font-semibold">¡Unconfirmed mail!</p>
            <p className="mt-2 text-center text-sm text-gray-500">{error.message}</p>
          </>
        )
      }
      footer={
        <>
          <Button as={Link} color="primary" href="/" variant="flat">
            Homepage
          </Button>
          {!isError ? (
            <Button as={Link} color="primary" href="/auth/signin" variant="solid">
              Go to login
            </Button>
          ) : (
            <Button
              as={Link}
              color="primary"
              href="/auth/resend-confirmation-email"
              target="_blank"
              variant="solid"
              onPress={() => router.push('/')}
            >
              Resend email
            </Button>
          )}
        </>
      }
      title="Email confirmation"
    />
  )
}
