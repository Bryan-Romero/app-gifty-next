import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gif } from "@/types";
import { AxiosError } from "axios";

export async function getGifByID(gif_id: string) {
  return await ApiClientGiphy.get<Gif>(`gifs/${gif_id}`)
    .then((res) => res.data)
    .catch((err: AxiosError<any>) => {
      throw err;
    });
}
