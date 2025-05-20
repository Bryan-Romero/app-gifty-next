"use client";

import { useSignUp } from "@/hooks/useServices/useSignUp";
import { TSignUpSchema, signUpSchema } from "@/types";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function ModalSignUp({
  isOpen,
  onOpenChange,
  onClose,
}: Omit<ModalProps, "children">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [errorSignUp, setErrorSignUp] = useState<string>();
  const signUpMutation = useSignUp(setError, setErrorSignUp);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleOnClose = () => {
    reset();
    clearErrors();
    setErrorSignUp("");
    onClose();
  };

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    await signUpMutation.mutateAsync(data).then(() => console.log("Sign Up"));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      onClose={handleOnClose}
    >
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

        <ModalBody>
          {errorSignUp && (
            <p className="text-base text-red-400 text-center">{errorSignUp}</p>
          )}
          <Input
            autoFocus
            label="Username"
            placeholder="Enter username"
            variant="bordered"
            isInvalid={!!errors.username}
            color={errors.username ? "danger" : "default"}
            errorMessage={errors.username?.message}
            isDisabled={isSubmitting}
            classNames={{
              input: "text-base",
            }}
            {...register("username")}
          />
          <Input
            endContent={
              <FontAwesomeIcon
                icon={faEnvelope}
                size="1x"
                className="pointer-events-none"
              />
            }
            label="Email"
            placeholder="Enter email"
            variant="bordered"
            isInvalid={!!errors.email}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email?.message}
            isDisabled={isSubmitting}
            classNames={{
              input: "text-base",
            }}
            {...register("email")}
          />
          <Input
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    size="1x"
                    className="pointer-events-none"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    size="1x"
                    className="pointer-events-none"
                  />
                )}
              </button>
            }
            label="Password"
            placeholder="Enter password"
            description=""
            type={isVisible ? "text" : "password"}
            variant="bordered"
            isInvalid={!!errors.password}
            color={errors.password ? "danger" : "default"}
            errorMessage={errors.password?.message}
            isDisabled={isSubmitting}
            classNames={{
              input: "text-base",
            }}
            {...register("password")}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
            isInvalid={!!errors.confirmPassword}
            color={errors.confirmPassword ? "danger" : "default"}
            errorMessage={errors.confirmPassword?.message}
            isDisabled={isSubmitting}
            classNames={{
              input: "text-base",
            }}
            {...register("confirmPassword")}
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
            color="primary"
            type="submit"
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
