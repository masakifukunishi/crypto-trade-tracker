import { setupAxiosInterceptors } from "./libs/axiosInterceptors";
import { makeAuthenticatedRequest } from "./libs/requestHelper";

// setupAxiosInterceptors();

interface Trading {
  date: string;
  type: string;
  quantity: number;
  price: number;
}

const ENDPOINT_URL = "/api/trading";

const tradingApi = {
  async getAll(token: string) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "get", {}, token);
  },
  async add(token: string, data: Trading) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "post", data, token);
  },
  async edit(token: string, id: string, data: Trading) {
    return await makeAuthenticatedRequest(`${ENDPOINT_URL}/${id}`, "put", data, token);
  },
  async delete(token: string, id: string) {
    return await makeAuthenticatedRequest(`${ENDPOINT_URL}/${id}`, "delete", {}, token);
  },
};

export default tradingApi;
