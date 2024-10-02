import axios, { AxiosInstance } from 'axios';

class AuthClient {
  private axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
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
  async register(email: string, password: string) {
    try {
      console.log('registering...');
      const res = await this.axiosInstance.post('/register', { email, password });
      sessionStorage.setItem('access_token', res.data.access_token);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't register: " + err);
    }
  }
  async login(email: string, password: string) {
    try {
      const res = await this.axiosInstance.post('/login', { email, password });
      sessionStorage.setItem('access_token', res.data.access_token);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't login: " + err);
    }
  }
  async logout() {
    try {
      await this.axiosInstance.post(
        '/logout',
        {},
        { headers: { Authorization: sessionStorage.getItem('access_token') } }
      );
      sessionStorage.removeItem('access_token');
    } catch (err) {
      throw new Error("Couldn't logout: " + err);
    }
  }
  async refreshToken() {
    return this.axiosInstance.post('/refresh', {}, { withCredentials: true });
  }
}
export default AuthClient;
