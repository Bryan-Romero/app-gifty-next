import ApiClientGiphy from "@/lib/axios-client-giphy";
import { TrendingSearches } from "@/types";
import { AxiosError } from "axios";

export async function getTrendingSearches() {
  return await ApiClientGiphy.get<TrendingSearches>("trending/searches")
    .then((res) => res.data)
    .catch((err: AxiosError<any>) => {
      throw err;
    });
}
