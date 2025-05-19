import { gifs } from "@/config";
import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";
import { AxiosError } from "axios";

export interface GifsSearchProps {
  q: string;
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

const initialParams: GifsSearchProps = {
  ...gifs,
  q: "",
};

export async function getGifsSearch({
  limit,
  offset,
  q,
  rating,
}: GifsSearchProps = initialParams) {
  return await ApiClientGiphy.get<Gifs>("gifs/search", {
    params: {
      q,
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
