import ApiClient from '@/lib/api/axios-client'
import { ApiRes } from '@/types/api-types/apiRes'
import { MessageRes } from '@/types/api-types/messageRes'

export async function logout(token: string): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>(
      'auth/logout',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return res.data.data
  } catch (error) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw error
  }
}
