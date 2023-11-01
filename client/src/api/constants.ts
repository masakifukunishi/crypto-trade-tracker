import axios from "axios";

const ENDPOINT_URL = "/api/constants";

const constantsApi = {
  async getTrading() {
    const result = await axios.get(`${ENDPOINT_URL}/trading`);
    return result.data;
  },
};

export default constantsApi;
