import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

// create axios instance
const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
  });
})();

const request = async <T = unknown>(
  options: AxiosRequestConfig,
): Promise<T> => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

export { request };
