"use client";

import {
  CircleExclamationIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@/components/Icons";
import { ErrorEnum, TSignInSchema } from "@/types";
import { Form, Input, Link } from "@heroui/react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface SignInFormProps {
  form: UseFormReturn<TSignInSchema>;
  errorSignIn?: string;
  isSubmitting?: boolean;
  setErrorSignIn: (msg: string) => void;
  onSubmit: (data: TSignInSchema) => void;
  formId: string;
}

export function SignInForm({
  form,
  errorSignIn,
  isSubmitting,
  setErrorSignIn,
  onSubmit,
  formId,
}: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isVisible, setIsVisible] = useState(false);

  if (errorSignIn === ErrorEnum.UnverifiedEmail) {
    return (
      <>
        <CircleExclamationIcon
          size="5x"
          color="#fb923c"
          className="mb-4"
        />
        <p className="text-gray-500 text-lg font-medium tex-or">
          Your email is not verified. Please check your inbox for a verification
          email.
        </p>
      </>
    );
  }

  return (
    <Form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorSignIn && (
        <p className="text-base text-red-400 text-center">{errorSignIn}</p>
      )}
      <Input
        autoFocus
        endContent={
          <EnvelopeIcon
            size="1x"
            className="pointer-events-none"
          />
        }
        classNames={{ input: "text-base" }}
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        isInvalid={!!errors.email}
        color={errors.email ? "danger" : "default"}
        errorMessage={errors.email?.message}
        isDisabled={isSubmitting}
        {...register("email", { onChange: () => setErrorSignIn("") })}
      />
      <Input
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible((v) => !v)}
          >
            {isVisible ? (
              <EyeSlashIcon
                size="1x"
                className="pointer-events-none"
              />
            ) : (
              <EyeIcon
                size="1x"
                className="pointer-events-none"
              />
            )}
          </button>
        }
        classNames={{ input: "text-base" }}
        label="Password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
        isInvalid={!!errors.password}
        color={errors.password ? "danger" : "default"}
        errorMessage={errors.password?.message}
        isDisabled={isSubmitting}
        {...register("password", { onChange: () => setErrorSignIn("") })}
      />

      <div className="flex justify-between">
        {/* <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox> */}
        <Link
          color="primary"
          size="sm"
          href="/auth/forgot-password"
          target="_blank"
        >
          Forgot password?
        </Link>
      </div>
    </Form>
  );
}
