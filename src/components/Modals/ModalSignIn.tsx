import { signInSchema, TSignInSchema } from "@/types";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function ModalSignIn({
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
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const [errorSignIn, setErrorSignIn] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleOnClose = () => {
    reset();
    clearErrors();
    setErrorSignIn("");
    onClose();
  };

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res) => {
      if (!res?.ok && res?.error) {
        setErrorSignIn(res?.error);
      } else {
        reset();
        handleOnClose();
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      placement="center"
    >
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>

        <ModalBody>
          {errorSignIn && (
            <p className="text-base text-red-400 text-center">{errorSignIn}</p>
          )}
          <Input
            autoFocus
            endContent={
              <FontAwesomeIcon
                icon={faEnvelope}
                size="1x"
                className="pointer-events-none"
              />
            }
            className="text-base"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            isInvalid={!!errors.email}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email?.message}
            isDisabled={isSubmitting}
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
            className="text-base"
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            isInvalid={!!errors.password}
            color={errors.password ? "danger" : "default"}
            errorMessage={errors.password?.message}
            isDisabled={isSubmitting}
            {...register("password")}
          />
          <div className="flex py-2 px-1 justify-between">
            {/* <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox> */}
            <Link
              color="primary"
              href="#"
              size="sm"
            >
              Forgot password?
            </Link>
          </div>
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
            Sign in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
