'use client'

import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { SignInForm } from '@/components/Forms/SignInForm'
import { useSignInForm } from '@/hooks'
import { ErrorEnum } from '@/types'

export default function Page() {
  const formId = 'sign-in-form'
  const { form, errorSignIn, setErrorSignIn, isSubmitting, onSubmit } = useSignInForm({ redirect: '/' })
  const router = useRouter()

  return (
    <CardMinimal
      title={errorSignIn === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
      body={
        <SignInForm
          formId={formId}
          form={form}
          errorSignIn={errorSignIn}
          setErrorSignIn={setErrorSignIn}
          onSubmit={onSubmit}
        />
      }
      footer={
        <>
          <Button variant="flat" color="primary" as={Link} href="/">
            Homepage
          </Button>
          {errorSignIn === ErrorEnum.UnverifiedEmail ? (
            <Button
              color="primary"
              as={Link}
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={() => router.push('/')}
            >
              Resend email
            </Button>
          ) : (
            <Button form={formId} type="submit" color="primary" isDisabled={isSubmitting} isLoading={isSubmitting}>
              Sign in
            </Button>
          )}
        </>
      }
      otherElement={
        // Sign up link
        <Card className="mt-5 w-full max-w-md">
          <CardBody className="text-center">
            <p className="text-base text-gray-600">
              Don&apos;t have an account?{' '}
              <Link color="primary" href="/auth/signup">
                Sign up
              </Link>
            </p>
          </CardBody>
        </Card>
      }
    />
  )
}
