import ApiClient from "@/lib/axios-client";
import { ApiRes } from "@/types/apiRes/apiRes";
import { MessageRes } from "@/types/apiRes/message-res";
import { TSignUpSchema } from "@/types/schemas/signUp";
import { AxiosError } from "axios";

export const signUp = (data: TSignUpSchema) => {
  return ApiClient.post<ApiRes<MessageRes>>("auth/signup", data)
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => {
      throw err;
    });
};
