import ApiClient from "@/lib/axios-client";
import { ApiRes } from "@/types";
import { AxiosError } from "axios";

export async function getFavGifs(token: string) {
  return await ApiClient.get<ApiRes<any>>("favorites", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.data.data)
    .catch((err: AxiosError<any>) => Promise.reject(err));
}
