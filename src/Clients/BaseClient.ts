import axios, { AxiosInstance } from 'axios';
import useRouterPush from '@/components/useRouterPush';
import applyCaseMiddleware from 'axios-case-converter';

class BaseClient {
  protected axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.axiosInstance = applyCaseMiddleware(
      axios.create({
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
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
            sessionStorage.setItem('accessToken', access_token);
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem('accessToken');
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
