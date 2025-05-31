import { gifs } from "@/config";
import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";

export interface GifsSearchProps {
  q: string;
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

const initialParams: GifsSearchProps = {
  ...gifs,
  q: "",
};

export async function getGifsSearch({
  limit,
  offset,
  q,
  rating,
}: GifsSearchProps = initialParams): Promise<Gifs | null> {
  try {
    const response = await ApiClientGiphy.get<Gifs>("gifs/search", {
      params: {
        q,
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
    throw err;
  }
}
