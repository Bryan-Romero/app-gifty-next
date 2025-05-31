import { useSignUp } from "@/hooks/useServices/useSignUp";
import { TSignUpSchema, signUpSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UseSignUpFormProps {
  onCloseModal?: () => void;
}

export function useSignUpForm({ onCloseModal }: UseSignUpFormProps = {}) {
  const [errorSignUp, setErrorSignUp] = useState<string>();
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { setError, reset, clearErrors } = form;

  const handleOnClose = () => {
    reset();
    clearErrors();
    setErrorSignUp("");
    onCloseModal?.();
  };

  const signUpMutation = useSignUp({
    setError,
    setErrorSignUp,
    handleOnSuccess: handleOnClose,
  });

  return {
    form,
    errorSignUp,
    setErrorSignUp,
    isSubmitting: signUpMutation.isPending,
    isSuccess: signUpMutation.isSuccess,
    onSubmit: (data: TSignUpSchema) => signUpMutation.mutateAsync(data),
    handleOnClose,
  };
}
