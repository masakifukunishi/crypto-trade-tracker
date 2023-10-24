import { setupAxiosInterceptors } from "./libs/axiosInterceptors";
import { makeAuthenticatedRequest } from "./libs/requestHelper";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/trading";

const tradingApi = {
  async add(user: any, data: any) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "post", data, user);
  },
  async edit(user: any, data: any) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "put", data, user);
  },
};

export default tradingApi;
