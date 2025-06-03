import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";

export async function getGifsByID(ids: string[]): Promise<Gifs | null> {
  try {
    const res = await ApiClientGiphy.get<Gifs>(`gifs`, {
      params: {
        ids: ids.join(","),
      },
    });
    return res.data;
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
