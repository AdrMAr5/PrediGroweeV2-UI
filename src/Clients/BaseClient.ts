import axios, { AxiosInstance } from 'axios';

class BaseClient {
  protected axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('access_token');
      console.log('token', token);
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
            const response = await this.refreshToken();
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);

            this.axiosInstance.defaults.headers.common['Authorization'] = accessToken;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }
  async refreshToken() {
    return this.axiosInstance.post('/refresh', {}, { withCredentials: true });
  }
}
export default BaseClient;
