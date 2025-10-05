'use client'

import { useActionState } from 'react'
import { Button, Card, CardBody, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { SignupForm } from '@/components/Forms/SignupForm'
import { CircleCheckIcon } from '@/components/Icons'
import { signup } from '@/lib/actions/signup'

export default function Page() {
  const formId = 'sign-up-form'
  const [state, formAction, isPending] = useActionState(signup, {})

  return (
    <CardMinimal
      body={
        state?.success ? (
          <>
            <CircleCheckIcon color="#22c55e" size="5x" />
            <p className="mt-4 text-center text-lg font-semibold text-green-600">Account created successfully!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to verify your account.</p>
          </>
        ) : (
          <SignupForm formAction={formAction} formId={formId} isPending={isPending} state={state} />
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
              Sign up
            </Button>
          )}
        </>
      }
      otherElement={
        // Sign in link
        <Card className="mt-5 w-full max-w-md">
          <CardBody className="text-center">
            <p className="text-base text-gray-600">
              Already have an account?{' '}
              <Link color="primary" href="/auth/signin">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      }
      title="Sign up"
    />
  )
}
