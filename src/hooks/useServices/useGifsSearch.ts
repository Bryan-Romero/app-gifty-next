import { getGifsSearch } from "@/services/giphy/getGifsSearch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useGifsSearch(query: string) {
  const { ref: scrollTriggerRef, inView } = useInView();

  const data = useInfiniteQuery({
    queryKey: ["gifs-search", query],
    queryFn: ({ pageParam = 0 }) =>
      getGifsSearch({
        q: query,
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
    if (inView) {
      data.fetchNextPage();
    }
  }, [data.fetchNextPage, inView]);

  return { ...data, scrollTriggerRef, inView };
}
