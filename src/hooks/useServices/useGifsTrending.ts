import { LIMIT } from "@/config";
import { getGifsTrending } from "@/services/giphy/getGifsTrending";
import { useInfiniteGifs } from "./useInfiniteGifs";

export function useGifsTrending() {
  return useInfiniteGifs({
    queryKey: ["gifs-trending"],
    queryFn: ({ pageParam = 0 }) =>
      getGifsTrending({ offset: pageParam, limit: LIMIT }),
  });
}
