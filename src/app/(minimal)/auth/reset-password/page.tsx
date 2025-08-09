'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Form, Input, Link } from '@heroui/react'

import { CardMinimal } from '@/components/CardMinimal'
import { CircleCheckIcon } from '@/components/Icons'
import { PasswordVisibilityToggle } from '@/components/PasswordVisibilityToggle'
import { useResetPasswordForm } from '@/hooks'

export default function Page() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const formId = 'reset-password-form'
  const { errorResetPassword, form, onSubmit, setErrorResetPassword, isSubmitting, isSuccess } =
    useResetPasswordForm(token)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const [isVisibleP, setIsVisibleP] = useState(false)
  const [isVisibleCP, setIsVisibleCP] = useState(false)

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
            <p className="text-center text-lg font-semibold text-green-600">Password reset!</p>
            <p className="mt-2 text-center text-sm text-gray-500">
              You will now be able to log in to your account using the updated credentials.
            </p>
          </>
        ) : (
          <>
            <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
              {errorResetPassword && <p className="w-full text-center text-base text-red-400">{errorResetPassword}</p>}
              <Input
                classNames={{ input: 'text-base' }}
                color={errors.password ? 'danger' : 'default'}
                endContent={
                  <PasswordVisibilityToggle isVisible={isVisibleP} onToggle={() => setIsVisibleP((v) => !v)} />
                }
                errorMessage={errors.password?.message}
                isDisabled={isSubmitting}
                isInvalid={!!errors.password}
                label="Password"
                placeholder="Enter password"
                type={isVisibleP ? 'text' : 'password'}
                variant="bordered"
                {...register('password', {
                  onChange: () => setErrorResetPassword(''),
                })}
              />
              <Input
                classNames={{ input: 'text-base' }}
                color={errors.confirmPassword ? 'danger' : 'default'}
                endContent={
                  <PasswordVisibilityToggle isVisible={isVisibleCP} onToggle={() => setIsVisibleCP((v) => !v)} />
                }
                errorMessage={errors.confirmPassword?.message}
                isDisabled={isSubmitting}
                isInvalid={!!errors.confirmPassword}
                label="Confirm Password"
                placeholder="Confirm your password"
                type={isVisibleCP ? 'text' : 'password'}
                variant="bordered"
                {...register('confirmPassword', {
                  onChange: () => setErrorResetPassword(''),
                })}
              />
            </Form>
          </>
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
              Reset password
            </Button>
          )}
        </>
      }
      title="Reset password"
    />
  )
}
