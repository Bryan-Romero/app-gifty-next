import { getGifsTrending } from "@/services/giphy/getGifsTrending";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useGifsTrending() {
  const { ref: scrollTriggerRef, inView } = useInView();

  const data = useInfiniteQuery({
    queryKey: ["gifs-trending"],
    queryFn: ({ pageParam = 0 }) =>
      getGifsTrending({
        offset: pageParam,
      }),
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
