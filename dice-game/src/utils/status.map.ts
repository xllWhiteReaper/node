export const statusMap: { [status: number]: string } = {
  200: "Action performed successfully",
  201: "Resource created successfully",
  400: "Bad request",
  401: "Access denied, invalid or expired credentials",
  403: "The resource you are trying to access requires a higher permission level",
  404: "The resource was not found",
  500: "Internal Server Error",
};
