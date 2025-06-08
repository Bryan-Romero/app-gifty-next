import ApiClientGiphy from "@/lib/axios-client-giphy";
import { Gifs } from "@/types";
import { GetGifsParams, initialGetGifsParams } from "@/types/giphy/get-gifs";

interface GetRelatedGifsParams extends GetGifsParams {
  gif_id: string;
}

export async function getGifsRelated(
  data: GetRelatedGifsParams = { gif_id: "", ...initialGetGifsParams }
): Promise<Gifs | null> {
  try {
    const response = await ApiClientGiphy.get<Gifs>("gifs/related", {
      params: data,
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
