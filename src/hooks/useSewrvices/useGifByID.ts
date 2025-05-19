import { getGifByID } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useGifByID(gif_id: string) {
  return useQuery({
    queryKey: ["gif", gif_id],
    queryFn: () => getGifByID(gif_id),
  });
}
