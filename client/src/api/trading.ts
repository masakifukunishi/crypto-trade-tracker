import { setupAxiosInterceptors } from "./libs/axiosInterceptors";
import { makeAuthenticatedRequest } from "./libs/requestHelper";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/trading";

const tradingApi = {
  async add(token: string, data: object) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "post", data, token);
  },
  async edit(token: string, data: object) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "put", data, token);
  },
};

export default tradingApi;
