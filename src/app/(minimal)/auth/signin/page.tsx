'use client'

import { useActionState } from 'react'
import { Button, Card, CardBody, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { SigninForm } from '@/components/Forms/SigninForm'
import { signin } from '@/lib/actions/signin'
import { ErrorEnum } from '@/types'

export default function Page() {
  const formId = 'sign-in-form'
  const [state, formAction, isPending] = useActionState(signin, {})

  return (
    <CardMinimal
      body={<SigninForm formAction={formAction} formId={formId} isPending={isPending} state={state} />}
      footer={
        <>
          <Button as={Link} color="primary" href="/" isDisabled={isPending} variant="flat">
            Homepage
          </Button>

          {state?.errors?.message === ErrorEnum.UnverifiedEmail ? (
            <Button as={Link} color="primary" href="/auth/resend-confirmation-email" target="_blank">
              Resend email
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isPending} isLoading={isPending} type="submit">
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
      title="Sign in"
      // title={errorSignIn === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
    />
  )
}
