"use client";

import { useSignInForm } from "@/hooks";
import { ErrorEnum } from "@/types";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";
import { SignInForm } from "../Forms/SignInForm";

export function ModalSignIn({
  isOpen,
  onOpenChange,
  onClose,
}: Omit<ModalProps, "children">) {
  const formId = "sign-in-form-modal";
  const {
    form,
    errorSignIn,
    setErrorSignIn,
    isSubmitting,
    onSubmit,
    handleOnClose,
  } = useSignInForm({ onCloseModal: onClose });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {errorSignIn === ErrorEnum.UnverifiedEmail
            ? "Email not verified"
            : "Sign in"}
        </ModalHeader>

        <ModalBody>
          <SignInForm
            formId={formId}
            form={form}
            errorSignIn={errorSignIn}
            setErrorSignIn={setErrorSignIn}
            onSubmit={onSubmit}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={handleOnClose}
            isDisabled={isSubmitting}
          >
            Close
          </Button>
          {errorSignIn === ErrorEnum.UnverifiedEmail ? (
            <Button
              color="primary"
              as={Link}
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={handleOnClose}
            >
              Resend email
            </Button>
          ) : (
            <Button
              form={formId}
              type="submit"
              color="primary"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
