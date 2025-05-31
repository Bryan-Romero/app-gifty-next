"use client";

import { CardMinimal } from "@/components/CardMinimal";
import { CircleCheckIcon, EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useResetPasswordForm } from "@/hooks";
import { Button, Form, Input, Link } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const formId = "reset-password-form";
  const {
    errorResetPassword,
    form,
    onSubmit,
    setErrorResetPassword,
    isSubmitting,
    isSuccess,
  } = useResetPasswordForm(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isVisibleP, setIsVisibleP] = useState(false);
  const [isVisibleCP, setIsVisibleCP] = useState(false);

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
      title="Reset password"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon
              size="5x"
              color="#22c55e"
              className="mb-4"
            />
            <p className="text-green-600 text-lg font-semibold text-center">
              Password reset!
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              You will now be able to log in to your account using the updated
              credentials.
            </p>
          </>
        ) : (
          <>
            <Form
              id={formId}
              onSubmit={handleSubmit(onSubmit)}
            >
              {errorResetPassword && (
                <p className="text-base text-red-400 text-center">
                  {errorResetPassword}
                </p>
              )}
              <Input
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisibleP((v) => !v)}
                  >
                    {isVisibleP ? (
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
                type={isVisibleP ? "text" : "password"}
                label="Password"
                placeholder="Enter password"
                variant="bordered"
                isInvalid={!!errors.password}
                color={errors.password ? "danger" : "default"}
                errorMessage={errors.password?.message}
                isDisabled={isSubmitting}
                classNames={{ input: "text-base" }}
                {...register("password", {
                  onChange: () => setErrorResetPassword(""),
                })}
              />
              <Input
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisibleCP((v) => !v)}
                  >
                    {isVisibleP ? (
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
                type={isVisibleCP ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                variant="bordered"
                isInvalid={!!errors.confirmPassword}
                color={errors.confirmPassword ? "danger" : "default"}
                errorMessage={errors.confirmPassword?.message}
                isDisabled={isSubmitting}
                classNames={{ input: "text-base" }}
                {...register("confirmPassword", {
                  onChange: () => setErrorResetPassword(""),
                })}
              />
            </Form>
          </>
        )
      }
      footer={
        <>
          <Button
            variant="flat"
            color="primary"
            as={Link}
            href="/"
          >
            Homepage
          </Button>
          {isSuccess ? (
            <Button
              as={Link}
              color="success"
              href="/auth/signin"
            >
              Go to login
            </Button>
          ) : (
            <Button
              form={formId}
              type="submit"
              color="primary"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Reset password
            </Button>
          )}
        </>
      }
    />
  );
}
