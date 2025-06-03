export interface PaginationProps {
  limit?: number;
  offset?: number;
  sort?: string;
  keyWord?: string;
}

export interface PaginationRes<T> {
  data: T[];
  pagination: {
    total_items: number;
    total_pages: number;
    items: number;
    offset: number;
  };
}
