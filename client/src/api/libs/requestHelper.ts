import axios from "axios";

export const makeAuthenticatedRequest = async (endPoint: string, method: string, data: object, token: string) => {
  const result = await axios({
    method: method,
    url: endPoint,
    data: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};
