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
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
