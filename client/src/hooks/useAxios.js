import { useEffect } from "react";
import axios from "../utils/axios";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // If there's no Authorization header, add one
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);

  return axios;
};

export default useAxios;
