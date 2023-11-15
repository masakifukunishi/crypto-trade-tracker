import { setupAxiosInterceptors } from "./libs/axiosInterceptors";
import { makeAuthenticatedRequest } from "./libs/requestHelper";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/ohlcv";

const ohlcvApi = {
  async get(token: string, period: string, coin: string) {
    return await makeAuthenticatedRequest(ENDPOINT_URL, "get", { period, coin }, token);
  },
};

export default ohlcvApi;
