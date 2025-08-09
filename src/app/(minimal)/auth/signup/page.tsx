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
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon color="#22c55e" size="5x" />
            <p className="mt-4 text-center text-lg font-semibold text-green-600">Account created successfully!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to verify your account.</p>
          </>
        ) : (
          <SignUpForm
            errorSignUp={errorSignUp}
            form={form}
            formId={formId}
            isSubmitting={isSubmitting}
            setErrorSignUp={setErrorSignUp}
            onSubmit={onSubmit}
          />
        )
      }
      footer={
        <>
          <Button as={Link} color="primary" href="/" variant="flat">
            Homepage
          </Button>
          {isSuccess ? (
            <Button as={Link} color="success" href="/auth/signin">
              Go to login
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isSubmitting} isLoading={isSubmitting} type="submit">
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
