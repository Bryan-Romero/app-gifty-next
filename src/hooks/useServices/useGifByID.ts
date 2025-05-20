import { getGifByID } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useGifByID(gif_id: string) {
  const {
    data: gif,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gif-by-id", gif_id],
    queryFn: () => getGifByID(gif_id),
  });

  return {
    gif,
    isLoading,
    isError,
  };
}
