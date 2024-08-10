import axios from 'axios';
import { CookieKeys, CookieStorage } from './cookies';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
// console.log('Base URL:', import.meta.env.VITE_API_SERVER);

http.interceptors.request.use((config) => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
