"use client";

import { CardMinimal } from "@/components/CardMinimal";
import { SignUpForm } from "@/components/Forms/SignUpForm";
import { CircleCheckIcon } from "@/components/Icons";
import { useSignUpForm } from "@/hooks";
import { Button, Card, CardBody, Link } from "@heroui/react";

export default function page() {
  const formId = "sign-up-form";
  const {
    form,
    errorSignUp,
    setErrorSignUp,
    isSubmitting,
    onSubmit,
    isSuccess,
  } = useSignUpForm();

  return (
    <CardMinimal
      title="Sign up"
      body={
        isSuccess ? (
          <>
            <CircleCheckIcon
              size="5x"
              color="#22c55e"
            />
            <p className="mt-4 text-green-600 text-lg font-semibold text-center">
              Account created successfully!
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Please check your email to verify your account.
            </p>
          </>
        ) : (
          <SignUpForm
            formId={formId}
            form={form}
            errorSignUp={errorSignUp}
            isSubmitting={isSubmitting}
            setErrorSignUp={setErrorSignUp}
            onSubmit={onSubmit}
          />
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
              Sign up
            </Button>
          )}
        </>
      }
      otherElement={
        // Sign in link
        <Card className="w-full max-w-md mt-5">
          <CardBody className="text-center">
            <p className="text-base text-gray-600">
              Already have an account?{" "}
              <Link
                color="primary"
                href="/auth/signin"
              >
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      }
    />
  );
}
