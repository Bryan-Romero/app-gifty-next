import { LIMIT } from "@/config";
import { getFavoriteGifs } from "@/services/apiRes/getFavoriteGifs";
import { KeysEnum } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/** useQuery: For simple data retrieval (GET, without pagination).
    useInfiniteQuery: For paginated/infinite data retrieval (GET, with pagination or infinite scrolling).
    useMutation: For creating, updating, or deleting data (POST, PUT, PATCH, DELETE). */

export function useGifsFavorites() {
  const { ref: scrollTriggerRef, inView } = useInView();
  const { data: session } = useSession();
  const token = session?.tokens?.access_token ?? null;

  const data = useInfiniteQuery({
    queryKey: [KeysEnum.GifsFavorites],
    enabled: !!token,
    queryFn: ({ pageParam = 0 }) => {
      return getFavoriteGifs({
        token,
        offset: pageParam,
        limit: LIMIT,
      });
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      const prevOffset =
        firstPage.pagination.offset - firstPage.pagination.count;
      return prevOffset >= 0 ? prevOffset : undefined;
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.pagination.offset + lastPage.pagination.count;
      return nextOffset >= lastPage.pagination.total_count
        ? undefined
        : nextOffset;
    },
  });

  useEffect(() => {
    if (inView && data.hasNextPage && !data.isFetchingNextPage) {
      data.fetchNextPage();
    }
  }, [inView, data.hasNextPage, data.isFetchingNextPage, data.fetchNextPage]);

  return { ...data, scrollTriggerRef, inView };
}
