import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appid, appkey } from "@env";

const instance = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2/",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["x-user-jwt"] = `Bearer ${token}`;
    }
    config.headers["x-app-id"] = appid;
    config.headers["x-app-key"] = appkey;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
