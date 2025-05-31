export interface ApiRes<T> {
  data: T | null;
  statusCode: number;
}
