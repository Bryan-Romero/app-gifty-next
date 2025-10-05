import ApiClientGiphy from '@/lib/api/axios-client-giphy'
import { Gifs } from '@/types'
import { GetGifsParams, initialGetGifsParams } from '@/types/giphy-types/getGifs'

export async function getGifsTrending(data: GetGifsParams = initialGetGifsParams): Promise<Gifs | null> {
  try {
    const response = await ApiClientGiphy.get<Gifs>('gifs/trending', {
      params: data,
    })
    return response.data
  } catch {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw { gifty: 'ERROR' }
  }
}
