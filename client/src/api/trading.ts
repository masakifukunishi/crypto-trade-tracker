import { setupAxiosInterceptors } from "./libs/axiosInterceptors";
import { makeAuthenticatedRequest } from "./libs/requestHelper";

setupAxiosInterceptors();

interface Trading {
  date: string;
  type: number;
  quantity: number;
  price: number;
}

const ENDPOINT_URL = "/api/trading";

const tradingApi = {
  async add(token: string, data: Trading) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "post", data, token);
  },
  async edit(token: string, data: Trading) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "put", data, token);
  },
};

export default tradingApi;
