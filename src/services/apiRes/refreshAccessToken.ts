import ApiClient from "@/lib/axios-client";
import { ErrorEnum } from "@/types";
import { ApiRes } from "@/types/apiRes/apiRes";
import { AxiosError } from "axios";
import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(data: JWT) {
  return await ApiClient.post<ApiRes<JWT>>(
    "auth/refresh-tokens",
    {},
    { headers: { Authorization: `Bearer ${data.tokens.refresh_token}` } }
  )
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => {
      return {
        ...data,
        error: ErrorEnum.RefreshAccessTokenError,
      };
    });
}
