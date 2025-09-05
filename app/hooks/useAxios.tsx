"use client";

import { useEffect } from "react";
import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import axios from "../axios";

const redirectToSignIn = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/sign-in";
  }
};

const useAxios = () => {
  useEffect(() => {
    interface CustomAxiosRequestConfig extends AxiosRequestConfig {
      _retry?: boolean;
    }
    const interceptor = axios.interceptors.response.use(
      (responce: AxiosResponse) => responce,
      async (error: AxiosError) => {
        if (!error.config) {
          return Promise.reject(error);
        }
        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log(
            "Token Expired",
            error.response?.status,
            originalRequest._retry
          );
          originalRequest._retry = true;
          try {
            const refreshResponse = await axios.post("/api/auth/refresh-token");
            if (refreshResponse.status === 200) {
              return axios(originalRequest);
            }
          } catch (error) {
            try {
              await axios.post("/api/auth/sign-out");
            } catch (logoutError) {
              return Promise.reject(error);
            }

            redirectToSignIn();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor!);
    };
  }, []);

  return axios;
};

export default useAxios;
