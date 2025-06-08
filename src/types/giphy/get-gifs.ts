import { LIMIT } from "@/config";

export interface GetGifsParams {
  limit?: number;
  offset?: number;
  rating?: "g" | "pg" | "pg-13" | "r";
}

export const initialGetGifsParams: GetGifsParams = {
  limit: LIMIT,
  offset: 0,
  rating: "g",
};
