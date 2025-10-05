'use client'

import { useCallback, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'

import { useResettableActionState } from '@/hooks'
import { signup } from '@/lib/actions/signup'
import { SignupForm } from '../Forms/SignupForm'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function ModalSignup({ isOpen, onClose }: Props) {
  const formId = 'sign-up-form-modal'
  const [state, formAction, isPending, reset] = useResettableActionState(signup, {})

  const handleOnClose = useCallback(() => {
    if (!isPending) {
      // Close the modal
      onClose()
      // Reset the form
      reset()
    }
  }, [isPending, onClose, reset])

  // Handle successful signup
  useEffect(() => {
    if (state?.success) {
      // Close the modal
      handleOnClose()
    }
  }, [handleOnClose, state?.success])

  return (
    <Modal isOpen={isOpen} placement="center" onClose={handleOnClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

        <ModalBody>
          <SignupForm formAction={formAction} formId={formId} isPending={isPending} state={state} />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" isDisabled={isPending} variant="flat" onPress={handleOnClose}>
            Close
          </Button>
          <Button color="primary" form={formId} isDisabled={isPending} isLoading={isPending} type="submit">
            Sign up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
