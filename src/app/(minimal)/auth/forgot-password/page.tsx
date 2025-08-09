'use client'

import { useEffect } from 'react'
import { Button, Form, Input, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon, EnvelopeIcon } from '@/components/Icons'
import { useForgotPasswordForm } from '@/hooks'

export default function Page() {
  const formId = 'forgot-password-form'
  const { errorForgotPassword, form, onSubmit, setErrorForgotPassword, isSubmitting, isSuccess } =
    useForgotPasswordForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        window.close()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [isSuccess])

  return (
    <CardMinimal
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon className="mb-4" color="#22c55e" size="5x" />
            <p className="text-center text-lg font-semibold text-green-600">Email sent!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to change your password.</p>
          </>
        ) : (
          <>
            <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
              {errorForgotPassword && (
                <p className="w-full text-center text-base text-red-400">{errorForgotPassword}</p>
              )}
              <Input
                autoFocus
                classNames={{ input: 'text-base' }}
                color={errors.email ? 'danger' : 'default'}
                endContent={<EnvelopeIcon className="pointer-events-none" size="1x" />}
                errorMessage={errors.email?.message}
                isDisabled={isSubmitting}
                isInvalid={!!errors.email}
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                {...register('email', {
                  onChange: () => setErrorForgotPassword(''),
                })}
              />
            </Form>
          </>
        )
      }
      footer={
        isSuccess ? (
          <Button as={Link} color="primary" href="/" variant="flat">
            Home
          </Button>
        ) : (
          <Button color="primary" form={formId} isDisabled={isSubmitting} isLoading={isSubmitting} type="submit">
            Send Email
          </Button>
        )
      }
      title="Forgot your password?"
    />
  )
}
