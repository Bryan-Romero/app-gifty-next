import { resetPasswordSchema, TResetPasswordSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../useServices/useResetPassword";

export function useResetPasswordForm(token: string) {
  const [errorResetPassword, setErrorResetPassword] = useState<string>();
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { setError } = form;

  const resetPasswordMutation = useResetPassword({
    setError,
    setErrorResetPassword,
  });

  return {
    form,
    errorResetPassword,
    setErrorResetPassword,
    isSubmitting: resetPasswordMutation.isPending,
    isSuccess: resetPasswordMutation.isSuccess,
    onSubmit: (data: TResetPasswordSchema) =>
      resetPasswordMutation.mutateAsync({ ...data, token }),
  };
}
