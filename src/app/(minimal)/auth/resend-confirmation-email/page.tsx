'use client'

import { useEffect } from 'react'
import { Button, Form, Input, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon, EnvelopeIcon } from '@/components/Icons'
import { useResendEmailForm } from '@/hooks'

export default function Page() {
  const formId = 'resend-confirmation-email-form'
  const { errorResendEmail, form, onSubmit, setErrorResendEmail, isSubmitting, isSuccess } = useResendEmailForm()
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
      title="Resend confirmation email"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon size="5x" color="#22c55e" className="mb-4" />
            <p className="text-center text-lg font-semibold text-green-600">Email sent!</p>
            <p className="mt-2 text-center text-sm text-gray-500">Please check your email to verify your account.</p>
          </>
        ) : (
          <>
            <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
              {errorResendEmail && <p className="w-full text-center text-base text-red-400">{errorResendEmail}</p>}
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
                  onChange: () => setErrorResendEmail(''),
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
