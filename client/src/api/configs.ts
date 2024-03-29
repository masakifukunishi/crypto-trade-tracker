import axios from "axios";

const ENDPOINT_URL = "/api/configs";

const configsApi = {
  async getKraken() {
    const result = await axios.get(`${ENDPOINT_URL}/kraken`);
    return result.data;
  },
};

export default configsApi;
