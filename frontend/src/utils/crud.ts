import axios, { AxiosRequestConfig } from "axios";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

axios.defaults.timeout = 5000;

const useGet = <T = unknown>(
  key: QueryKey | string,
  url: string,
  params?: object,
  queryOptions?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
  fetchOptions?: Omit<AxiosRequestConfig, "method" | "params">,
) => {
  return useQuery<T>({
    queryKey: typeof key === "string" ? [key] : key,
    queryFn: async (): Promise<T> =>
      await axios.request({
        method: "GET",
        url,
        params,
        ...fetchOptions,
      }),
    ...queryOptions,
  });
};

// const usePost = <T>(url: string, payload: T, options: AxiosRequestConfig) => {
//   return axios
//     .get(url, config)
//     .then((res) => res)
//     .catch((err) => console.log(err));
// };

export { useGet };
