import BaseClient from '@/Clients/BaseClient';

class AuthClient extends BaseClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async register(email: string, password: string) {
    try {
      console.log('registering...');
      const res = await this.axiosInstance.post(
        '/register',
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem('access_token', res.data.access_token);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't register: " + err);
    }
  }
  async login(email: string, password: string) {
    try {
      const res = await this.axiosInstance.post(
        '/login',
        { email, password },
        { withCredentials: true }
      );
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

  async checkSession() {
    try {
      const res = await this.axiosInstance.get('/verifySession', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't check session: " + err);
    }
  }
}
export default AuthClient;
