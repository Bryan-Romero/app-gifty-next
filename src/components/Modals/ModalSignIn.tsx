'use client'

import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useSession } from 'next-auth/react'

import { useResettableActionState } from '@/hooks'
import { signin } from '@/lib/actions/signin'
import { ErrorEnum } from '@/types'
import { SigninForm } from '../Forms/SigninForm'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function ModalSignin({ isOpen, onClose }: Props) {
  const formId = 'sign-in-form-modal'
  const { update } = useSession()
  const [state, formAction, isPending, reset] = useResettableActionState(signin, {})

  const handleOnClose = useCallback(() => {
    if (!isPending) {
      // Close the modal
      onClose()
      // Reset the form
      reset()
    }
  }, [isPending, onClose, reset])

  // Handle successful login
  useEffect(() => {
    if (state?.success) {
      // Force session update
      update()
      // Close the modal
      handleOnClose()
    }
  }, [handleOnClose, state?.success, update])

  return (
    <Modal isOpen={isOpen} placement="center" onClose={handleOnClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {state?.errors?.message === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
        </ModalHeader>

        <ModalBody>
          <SigninForm formAction={formAction} formId={formId} isPending={isPending} state={state} />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" isDisabled={isPending} variant="flat" onPress={handleOnClose}>
            Close
          </Button>
          {state?.errors?.message === ErrorEnum.UnverifiedEmail ? (
            <Button
              as={Link}
              color="primary"
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={handleOnClose}
            >
              Resend email
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isPending} isLoading={isPending} type="submit">
              Sign in
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
