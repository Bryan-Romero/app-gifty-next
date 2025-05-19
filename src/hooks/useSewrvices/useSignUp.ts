import { signUp } from "@/services/apiRes/signUp";
import { TSignUpSchema } from "@/types/schemas/signUp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";

export function useSignUp(
  setError?: UseFormSetError<TSignUpSchema>,
  setErrorSignUp?: Dispatch<SetStateAction<string | undefined>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: TSignUpSchema) => signUp(props),
    onSuccess: () => console.log("SignUp Successfully"),
    onError: (err: AxiosError<any>) => {
      if (err.response?.status === 409) {
        const { username = "", email = "" } = err.response?.data?.error;
        if (username)
          setError?.("username", { message: "Username already exists" });
        if (email) setError?.("email", { message: "Email already exists" });
      } else if (err.response?.status === 400) {
        const { confirmPassword = "" } = err.response?.data?.error;
        if (confirmPassword)
          setError?.("confirmPassword", { message: "Passwords must match" });
      } else {
        setErrorSignUp?.("Something went wrong");
      }
      throw err;
    },
    onSettled: async (accessRes, error) => {
      if (error) {
        // console.log(error);
        throw error;
      } else {
        await queryClient.invalidateQueries({ queryKey: ["signUp"] });
      }
    },
  });
}
