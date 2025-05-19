import ApiClient from "@/lib/axios-client";
import { ApiRes } from "@/types/apiRes/apiRes";
import { MessageRes } from "@/types/apiRes/message-res";
import { AxiosError } from "axios";

export async function logout(token: string) {
  return await ApiClient.post<ApiRes<MessageRes>>(
    "auth/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => Promise.reject(err));
}
