export type ApiErrorResponse<TCode extends string = string> = {
  statusCode: number;
  code?: TCode;
  message: string;
};
