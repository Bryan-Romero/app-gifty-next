import ApiClient from "@/lib/axios-client";
import { GetMe } from "@/types";
import { ApiRes } from "@/types/apiRes/apiRes";

export async function getMe(token: string): Promise<GetMe | null> {
  try {
    const res = await ApiClient.get<ApiRes<GetMe>>("user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
