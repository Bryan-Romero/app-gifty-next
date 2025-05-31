"use client";

import { useSignUpForm } from "@/hooks";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";
import { SignUpForm } from "../Forms/SignUpForm";

export function ModalSignUp({
  isOpen,
  onOpenChange,
  onClose,
}: Omit<ModalProps, "children">) {
  const formId = "sign-up-form-modal";
  const {
    form,
    errorSignUp,
    setErrorSignUp,
    isSubmitting,
    onSubmit,
    handleOnClose,
  } = useSignUpForm({ onCloseModal: onClose });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      onClose={handleOnClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

        <ModalBody>
          <SignUpForm
            formId={formId}
            form={form}
            errorSignUp={errorSignUp}
            isSubmitting={isSubmitting}
            setErrorSignUp={setErrorSignUp}
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
          <Button
            form={formId}
            type="submit"
            color="primary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
