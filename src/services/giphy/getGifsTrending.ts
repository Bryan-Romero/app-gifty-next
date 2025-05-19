import { gifs } from "@/config";
import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";
import { AxiosError } from "axios";

export interface GifsTrendingProps {
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

export async function getGifsTrending({
  limit,
  offset,
  rating,
}: GifsTrendingProps = gifs) {
  return await ApiClientGiphy.get<Gifs>("gifs/trending", {
    params: {
      limit,
      offset,
      rating,
    },
  })
    .then((res) => res.data)
    .catch((err: AxiosError<any>) => {
      throw err;
    });
}
