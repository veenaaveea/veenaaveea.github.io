export type AuthenticationError = {
  method: string,
  url: string,
  statusText: string,
  statusCode: number,
  error: string,
  errorCode: string,
  link: string,
}
