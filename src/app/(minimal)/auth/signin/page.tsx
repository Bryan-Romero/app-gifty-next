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
      body={
        <SignInForm
          errorSignIn={errorSignIn}
          form={form}
          formId={formId}
          isSubmitting={isSubmitting}
          setErrorSignIn={setErrorSignIn}
          onSubmit={onSubmit}
        />
      }
      footer={
        <>
          <Button as={Link} color="primary" href="/" variant="flat">
            Homepage
          </Button>
          {errorSignIn === ErrorEnum.UnverifiedEmail ? (
            <Button
              as={Link}
              color="primary"
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={() => router.push('/')}
            >
              Resend email
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isSubmitting} isLoading={isSubmitting} type="submit">
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
      title={errorSignIn === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
    />
  )
}
