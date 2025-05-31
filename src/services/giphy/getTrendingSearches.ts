import ApiClientGiphy from "@/lib/axios-client-giphy";
import { TrendingSearches } from "@/types";
import { AxiosError } from "axios";

export async function getTrendingSearches(): Promise<TrendingSearches | null> {
  try {
    const response = await ApiClientGiphy.get<TrendingSearches>(
      "trending/searches"
    );
    return response.data;
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
