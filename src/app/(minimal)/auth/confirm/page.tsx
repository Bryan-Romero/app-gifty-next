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
        <Spinner size="lg" color="primary" />
      </div>
    )

  return (
    <CardMinimal
      title="Email confirmation"
      body={
        !isError ? (
          <>
            <CircleCheckIcon size="5x" color="#22c55e" className="mb-4" />
            <p className="text-center text-lg font-semibold text-green-600">¡Confirmed mail!</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Your email has been successfully verified.
              <br />
              You can now login to your account.
            </p>
          </>
        ) : (
          <>
            <CircleXmarkIcon size="5x" color="#ef4444" className="mb-4" />
            <p className="text-center text-lg font-semibold">¡Unconfirmed mail!</p>
            <p className="mt-2 text-center text-sm text-gray-500">{error.message}</p>
          </>
        )
      }
      footer={
        <>
          <Button variant="flat" color="primary" as={Link} href="/">
            Homepage
          </Button>
          {!isError ? (
            <Button variant="solid" color="primary" as={Link} href="/auth/signin">
              Go to login
            </Button>
          ) : (
            <Button
              variant="solid"
              color="primary"
              as={Link}
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={() => router.push('/')}
            >
              Resend email
            </Button>
          )}
        </>
      }
    />
  )
}
