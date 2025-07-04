import ApiClient from '@/lib/axios-client'
import { ApiRes } from '@/types/apiRes/apiRes'
import { MessageRes } from '@/types/apiRes/message-res'

export interface AddOrRemoveFavoriteData {
  token: string
  gifId: string
}

export async function addFavorite({ token, ...data }: AddOrRemoveFavoriteData): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>('favorites', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data.data
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err
  }
}
