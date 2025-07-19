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
      onOpenChange={(open) => {
        if (!isSubmitting) onOpenChange(open)
      }}
      onClose={handleModalClose}
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {errorSignIn === ErrorEnum.UnverifiedEmail ? 'Email not verified' : 'Sign in'}
        </ModalHeader>

        <ModalBody>
          <SignInForm
            formId={formId}
            form={form}
            errorSignIn={errorSignIn}
            isSubmitting={isSubmitting}
            setErrorSignIn={setErrorSignIn}
            onSubmit={onSubmit}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="flat" onPress={handleModalClose} isDisabled={isSubmitting}>
            Close
          </Button>
          {errorSignIn === ErrorEnum.UnverifiedEmail ? (
            <Button
              color="primary"
              as={Link}
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={handleModalClose}
            >
              Resend email
            </Button>
          ) : (
            <Button form={formId} type="submit" color="primary" isDisabled={isSubmitting} isLoading={isSubmitting}>
              Sign in
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
