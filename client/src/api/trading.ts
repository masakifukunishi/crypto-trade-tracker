import axios from "axios";

import { setupAxiosInterceptors } from "./libs/axiosInterceptors";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/trading";

const tradingApi = {
  async add(userId: string, data: any) {
    const result = await axios.post(ENDPOINT_URL, {
      userId: userId,
      data: data,
    });
    return result.data;
  },
};

export default tradingApi;
