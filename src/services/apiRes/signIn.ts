import { ApiRes } from "@/types/apiRes/apiRes";
import { TSignInSchema } from "@/types/schemas/signIn";
import { AxiosError } from "axios";
import ApiClient from "@/lib/axios-client";
import { AccessRes, ErrorEnum } from "@/types";

export async function signIn(data: TSignInSchema): Promise<AccessRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<AccessRes>>("auth/signin", data);
    return res.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 429) {
        throw new Error("Too many attempts, please try again later");
      }
      if (err.response?.status === 401) {
        throw new Error(ErrorEnum.UnverifiedEmail);
      }

      /** This error is a catch-all for any other error coming from the server that
       * is not specifically a 429 (too many attempts) or other 4xx errors */
      throw new Error("Invalid credentials");
    }

    throw err;
  }
}
