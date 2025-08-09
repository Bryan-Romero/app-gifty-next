'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@heroui/react'

import { useSignUpForm } from '@/hooks'
import { SignUpForm } from '../Forms/SignUpForm'

export function ModalSignUp({ isOpen, onOpenChange, onClose }: Omit<ModalProps, 'children'>) {
  const formId = 'sign-up-form-modal'
  const { form, errorSignUp, setErrorSignUp, isSubmitting, onSubmit, handleModalClose } = useSignUpForm({
    onCloseModal: onClose,
  })

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={handleModalClose}
      onOpenChange={(open) => {
        if (!isSubmitting) onOpenChange(open)
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

        <ModalBody>
          <SignUpForm
            errorSignUp={errorSignUp}
            form={form}
            formId={formId}
            isSubmitting={isSubmitting}
            setErrorSignUp={setErrorSignUp}
            onSubmit={onSubmit}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" isDisabled={isSubmitting} variant="flat" onPress={handleModalClose}>
            Close
          </Button>
          <Button color="primary" form={formId} isDisabled={isSubmitting} isLoading={isSubmitting} type="submit">
            Sign up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
