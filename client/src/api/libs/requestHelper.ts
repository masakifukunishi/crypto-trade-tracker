import axios from "axios";

export const makeAuthenticatedRequest = async (endPoint: string, method: string, data: object, token: string) => {
  try {
    const result = await axios({
      method: method,
      url: endPoint,
      data: {
        ...data,
      },
      headers: {
        Authorization: `Bearer ${token}a`,
      },
    });
    console.log("success");
    return result.data;
  } catch (error) {
    console.log(error);
    console.log("failed");
    return error;
  }
};
