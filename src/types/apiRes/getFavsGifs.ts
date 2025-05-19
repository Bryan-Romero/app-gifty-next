export interface GetFavsGifs {
  limit?: number;
  page?: number;
  sort?: 1 | -1 | "asc" | "ascending" | "desc" | "descending";
  keyWord?: string;
}
