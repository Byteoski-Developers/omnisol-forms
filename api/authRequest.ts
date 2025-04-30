import { getToken } from "@/utils/auth";
import axios, { AxiosRequestConfig } from "axios";


export default function authRequest(config: AxiosRequestConfig) {
  const token = getToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return axios(config);
}
