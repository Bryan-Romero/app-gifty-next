export interface ApiRes<T> {
  data: T;
  statusCode: number;
  error: any;
}
