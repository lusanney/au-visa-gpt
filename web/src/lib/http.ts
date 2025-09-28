import axios, { AxiosError } from "axios";

export const http = axios.create({ baseURL: "" });

http.interceptors.response.use(
  (resp) => resp,
  (err: AxiosError) => {
    // You can add toast/notification hooks later
    return Promise.reject(err);
  },
);
