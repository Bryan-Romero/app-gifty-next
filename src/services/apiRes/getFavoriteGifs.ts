import ApiClient from "@/lib/axios-client";
import { Gifs, PaginationProps, PaginationRes } from "@/types";
import { ApiRes } from "@/types/apiRes/apiRes";
import { getGifsByID } from "../giphy/getGifsByID";

export async function getFavoriteGifs({
  token,
  ...params
}: PaginationProps & { token: string }): Promise<Gifs | null> {
  try {
    const res = await ApiClient.get<ApiRes<PaginationRes<string>>>(
      "favorites/pagination-gifId",
      {
        params,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = res.data.data;
    if (data.data.length > 0) {
      const gifs = await getGifsByID(data.data);

      return {
        data: gifs.data,
        meta: gifs.meta,
        pagination: {
          count: data.pagination.items,
          offset: data.pagination.offset,
          total_count: data.pagination.total_items,
        },
      };
    }
    return {
      data: [],
      meta: {
        msg: "",
        response_id: "",
        status: 200,
      },
      pagination: {
        count: 0,
        offset: 0,
        total_count: 0,
      },
    };
  } catch (err) {
    // Puedes loguear el error aquí si lo necesitas
    // console.error("Error en getMe:", err);
    // return null; // O puedes lanzar un error si prefieres
    // throw new Error("No se pudo obtener el usuario");
    throw err;
  }
}
