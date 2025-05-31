import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gif } from "@/types";

export async function getGifByID(gif_id: string): Promise<Gif | null> {
  try {
    const res = await ApiClientGiphy.get<Gif>(`gifs/${gif_id}`);
    return res.data;
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
