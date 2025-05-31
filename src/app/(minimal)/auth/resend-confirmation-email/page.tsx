"use client";

import { CardMinimal } from "@/components/CardMinimal";
import { CircleCheckIcon, EnvelopeIcon } from "@/components/Icons";
import { useResendEmailForm } from "@/hooks";
import { Button, Form, Input, Link } from "@heroui/react";
import { useEffect } from "react";

export default function Page() {
  const formId = "resend-confirmation-email-form";
  const {
    errorResendEmail,
    form,
    onSubmit,
    setErrorResendEmail,
    isSubmitting,
    isSuccess,
  } = useResendEmailForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        window.close();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  return (
    <CardMinimal
      title="Resend confirmation email"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon
              size="5x"
              color="#22c55e"
              className="mb-4"
            />
            <p className="text-green-600 text-lg font-semibold text-center">
              Email sent!
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Please check your email to verify your account.
            </p>
          </>
        ) : (
          <>
            <Form
              id={formId}
              onSubmit={handleSubmit(onSubmit)}
            >
              {errorResendEmail && (
                <p className="text-base text-red-400 text-center">
                  {errorResendEmail}
                </p>
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
                {...register("email", {
                  onChange: () => setErrorResendEmail(""),
                })}
              />
            </Form>
          </>
        )
      }
      footer={
        isSuccess ? (
          <Button
            as={Link}
            color="primary"
            variant="flat"
            href="/"
          >
            Home
          </Button>
        ) : (
          <Button
            form={formId}
            type="submit"
            color="primary"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Send Email
          </Button>
        )
      }
    />
  );
}
