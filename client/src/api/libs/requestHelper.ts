import axios from "axios";

export const makeAuthenticatedRequest = async (endPoint: string, method: string, data: {}, user: any) => {
  const result = await axios({
    method: method,
    url: endPoint,
    data: {
      userId: user.uid,
      data: data,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return result.data;
};
