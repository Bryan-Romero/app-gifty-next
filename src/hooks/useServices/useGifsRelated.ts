import { LIMIT } from "@/config";
import { getGifsRelated } from "@/services";
import { useInfiniteGifs } from "./useInfiniteGifs";

export function useGifsRelated(gif_id: string) {
  return useInfiniteGifs({
    queryKey: ["gifs-related"],
    queryFn: ({ pageParam = 0 }) =>
      getGifsRelated({
        gif_id,
        offset: pageParam,
        limit: LIMIT,
      }),
  });
}
