import ApiClient from "@/lib/axios-client";
import { GetMe } from "@/types";
import { ApiRes } from "@/types/apiRes/apiRes";
import { AxiosError } from "axios";

export async function getMe(token: string) {
  return await ApiClient.get<ApiRes<GetMe>>("user/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => Promise.reject(err));
}
