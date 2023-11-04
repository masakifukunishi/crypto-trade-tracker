import axios, { AxiosRequestConfig } from "axios";

export const makeAuthenticatedRequest = async (endPoint: string, method: string, data: object, token: string) => {
  const config: AxiosRequestConfig = {
    method: method,
    url: endPoint,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (method.toUpperCase() === "GET") {
    config.params = data;
  } else {
    config.data = data;
  }

  const result = await axios(config);
  return result.data;
};
