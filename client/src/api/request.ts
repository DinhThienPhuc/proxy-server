/* BASE REQUEST INTERCEPTORS CONFIG
   ========================================================================== */

import axios, { AxiosError } from "axios";
import { getFromLocalStorage, setToLocalStorage } from "utils/functions";

import { IBaseErrorResponse } from "./interfaces";
import { refresh } from "./post/post.api";

/**
 * Authenticated Request Interceptors config
 */
export const requestWithJwt = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  withCredentials: false,
});

requestWithJwt.interceptors.request.use(async (config) => {
  const { accessToken } = getFromLocalStorage<any>("tokens");

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken || ""}`,
      ...config.headers,
    },
  };
});

requestWithJwt.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<IBaseErrorResponse>) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.statusText === "Unauthorized" &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;
      const { refreshToken } = getFromLocalStorage<any>("tokens");
      const response = await refresh({ refreshToken });
      const accessToken = response.data?.accessToken;
      setToLocalStorage(
        "tokens",
        JSON.stringify({ accessToken, refreshToken }),
      );
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return requestWithJwt(originalRequest);
    }

    if (!error.response || !error.response?.data) {
      return Promise.reject({
        code: "Unknown",
        status: 500,
        message: "Server error",
      });
    }
    return Promise.reject({
      ...error.response?.data,
    });
  },
);

/**
 * Non-authenticated Request Interceptors config
 */
export const requestWithoutJwt = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  withCredentials: false,
});

requestWithoutJwt.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<IBaseErrorResponse>) => {
    return Promise.reject({
      ...error.response?.data,
    });
  },
);
