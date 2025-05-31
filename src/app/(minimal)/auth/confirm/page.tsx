"use client";

import { CardMinimal } from "@/components/CardMinimal";
import { CircleCheckIcon, CircleXmarkIcon } from "@/components/Icons";
import { useVerificationEmail } from "@/hooks/useServices/useVerificationEmail";
import { Button, Link, Spinner } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isLoading, isError, error } = useVerificationEmail(token);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
        />
      </div>
    );

  return (
    <CardMinimal
      title="Email confirmation"
      body={
        !isError ? (
          <>
            <CircleCheckIcon
              size="5x"
              color="#22c55e"
              className="mb-4"
            />
            <p className="text-green-600 text-lg font-semibold text-center">
              ¡Confirmed mail!
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Your email has been successfully verified.
              <br />
              You can now login to your account.
            </p>
          </>
        ) : (
          <>
            <CircleXmarkIcon
              size="5x"
              color="#ef4444"
              className="mb-4"
            />
            <p className="text-lg font-semibold text-center">
              ¡Unconfirmed mail!"
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              {error.message}
            </p>
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
          {!isError ? (
            <Button
              variant="solid"
              color="primary"
              as={Link}
              href="/auth/signin"
            >
              Go to login
            </Button>
          ) : (
            <Button
              variant="solid"
              color="primary"
              as={Link}
              href="/auth/resend-confirmation-email"
              target="_blank"
              onPress={() => router.push("/")}
            >
              Resend email
            </Button>
          )}
        </>
      }
    />
  );
}
