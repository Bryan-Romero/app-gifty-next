'use client'

import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@heroui/react'

import { useSignInForm } from '@/hooks'
import { ErrorEnum } from '@/types'
import { SignInForm } from '../Forms/SignInForm'

export function ModalSignIn({ isOpen, onOpenChange, onClose }: Omit<ModalProps, 'children'>) {
  const formId = 'sign-in-form-modal'
  const { form, errorSignIn, setErrorSignIn, isSubmitting, onSubmit, handleModalClose } = useSignInForm({
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
        <ModalHeader className="flex flex-col gap-1">
          {errorSignIn === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
        </ModalHeader>

        <ModalBody>
          <SignInForm
            errorSignIn={errorSignIn}
            form={form}
            formId={formId}
            isSubmitting={isSubmitting}
            setErrorSignIn={setErrorSignIn}
            onSubmit={onSubmit}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" isDisabled={isSubmitting} variant="flat" onPress={handleModalClose}>
            Close
          </Button>
          {errorSignIn === ErrorEnum.UnverifiedEmail ? (
            <Button
              as={Link}
              color="primary"
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={handleModalClose}
            >
              Resend email
            </Button>
          ) : (
            <Button color="primary" form={formId} isDisabled={isSubmitting} isLoading={isSubmitting} type="submit">
              Sign in
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
