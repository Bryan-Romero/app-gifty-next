import ApiClient from '@/lib/axios-client'
import { ApiRes } from '@/types/apiRes/apiRes'

export async function getAllIDsFavorites(token: string): Promise<string[]> {
  try {
    const res = await ApiClient.get<ApiRes<string[]>>('favorites', {
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
