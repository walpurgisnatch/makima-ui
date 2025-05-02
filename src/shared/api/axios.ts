import axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  // @ts-ignore
  baseURL: window.config?.VITE_API || import.meta.env.VITE_API || '',
  timeout: 20000,
});

export interface IAxiosRequest {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  permissions?: string;
  responseType?: AxiosRequestConfig['responseType'];
}

export { axiosInstance };
