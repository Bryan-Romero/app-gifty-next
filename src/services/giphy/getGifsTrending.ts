import { gifs } from "@/config";
import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";
import { AxiosError } from "axios";

export interface GifsTrendingProps {
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

export async function getGifsTrending({
  limit,
  offset,
  rating,
}: GifsTrendingProps = gifs): Promise<Gifs | null> {
  try {
    const response = await ApiClientGiphy.get<Gifs>("gifs/trending", {
      params: {
        limit,
        offset,
        rating,
      },
    });
    return response.data;
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw { gifty: "ERROR" };
  }
}
