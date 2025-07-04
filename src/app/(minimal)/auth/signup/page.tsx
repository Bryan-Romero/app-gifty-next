'use client'

import { Button, Card, CardBody, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { SignUpForm } from '@/components/Forms/SignUpForm'
import { CircleCheckIcon } from '@/components/Icons'
import { useSignUpForm } from '@/hooks'

export default function Page() {
  const formId = 'sign-up-form'
  const { form, errorSignUp, setErrorSignUp, isSubmitting, onSubmit, isSuccess } = useSignUpForm()

  return (
    <CardMinimal
      title="Sign up"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon size="5x" color="#22c55e" />
            <p className="mt-4 text-center text-lg font-semibold text-green-600">Account created successfully!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to verify your account.</p>
          </>
        ) : (
          <SignUpForm
            formId={formId}
            form={form}
            errorSignUp={errorSignUp}
            isSubmitting={isSubmitting}
            setErrorSignUp={setErrorSignUp}
            onSubmit={onSubmit}
          />
        )
      }
      footer={
        <>
          <Button variant="flat" color="primary" as={Link} href="/">
            Homepage
          </Button>
          {isSuccess ? (
            <Button as={Link} color="success" href="/auth/signin">
              Go to login
            </Button>
          ) : (
            <Button form={formId} type="submit" color="primary" isDisabled={isSubmitting} isLoading={isSubmitting}>
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
    />
  )
}
