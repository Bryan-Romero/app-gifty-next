import { gifs } from "@/config";
import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";

export interface GifsRelatedProps {
  gif_id: string;
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

const initialParams: GifsRelatedProps = {
  ...gifs,
  gif_id: "",
};

export async function getGifsRelated(
  params: GifsRelatedProps = initialParams
): Promise<Gifs | null> {
  try {
    const response = await ApiClientGiphy.get<Gifs>("gifs/related", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching related GIFs:", error);
    return null;
  }
}
