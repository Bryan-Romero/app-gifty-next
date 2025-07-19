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
      title="Forgot your password?"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon size="5x" color="#22c55e" className="mb-4" />
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
                endContent={<EnvelopeIcon size="1x" className="pointer-events-none" />}
                classNames={{ input: 'text-base' }}
                label="Email"
                type="email"
                placeholder="Enter your email"
                variant="bordered"
                isInvalid={!!errors.email}
                color={errors.email ? 'danger' : 'default'}
                errorMessage={errors.email?.message}
                isDisabled={isSubmitting}
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
          <Button as={Link} color="primary" variant="flat" href="/">
            Home
          </Button>
        ) : (
          <Button form={formId} type="submit" color="primary" isDisabled={isSubmitting} isLoading={isSubmitting}>
            Send Email
          </Button>
        )
      }
    />
  )
}
