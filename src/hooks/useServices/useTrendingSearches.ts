import { getTrendingSearches } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useTrendingSearches() {
  return useQuery({
    queryKey: ["trending-searches"],
    queryFn: () => getTrendingSearches(),
  });
}
