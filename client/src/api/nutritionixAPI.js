import axios from "axios";
import { appid, appkey } from "@env";

const instance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/",
});

instance.interceptors.request.use(
  async (config) => {
    config.headers["x-app-id"] = appid;
    config.headers["x-app-key"] = appkey;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
