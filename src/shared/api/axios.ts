import axios from 'axios';

const axiosInstance = axios.create({
  // @ts-ignore
  baseURL: window.config?.VITE_API || import.meta.env.VITE_API || '',
});

export { axiosInstance };