import { ApiRes } from "@/types/apiRes/apiRes";
import { TSignInSchema } from "@/types/schemas/signIn";
import { AxiosError } from "axios";
import ApiClient from "@/lib/axios-client";
import { AccessRes } from "@/types";

export async function signIn(data: TSignInSchema) {
  return ApiClient.post<ApiRes<AccessRes>>("auth/signin", data)
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => {
      throw err;
    });
}
