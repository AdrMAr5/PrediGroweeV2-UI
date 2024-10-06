import axios, { AxiosInstance } from 'axios';
import useRouterPush from '@/components/hooks/useRouterPush';

class BaseClient {
  protected axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    });
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await axios.post(
              'http://localhost/auth/refresh',
              {},
              { withCredentials: true }
            );
            const { access_token } = response.data;
            sessionStorage.setItem('access_token', access_token);
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem('access_token');
            await useRouterPush('/login');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error.response.data.err)
    );
  }
  async refreshToken() {
    return this.axiosInstance.post('/refresh', {}, { withCredentials: true });
  }
}
export default BaseClient;
