export interface APIResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}
