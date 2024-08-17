import axios from "axios";
import { CookieKeys, CookieStorage } from "./cookies";

const httpMulti = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

httpMulti.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${
      CookieStorage.get(CookieKeys.AuthToken)
        ? CookieStorage.get(CookieKeys.AuthToken)
        : ""
    }`,
  };
  return config;
});

export default httpMulti;
