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
      sessionStorage.setItem('accessToken', res.data.accessToken);
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
      sessionStorage.setItem('accessToken', res.data.accessToken);
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
        {
          headers: { Authorization: sessionStorage.getItem('accessToken') },
          withCredentials: true,
        }
      );
      sessionStorage.removeItem('accessToken');
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
  async getUser(id: string) {
    try {
      const res = await this.axiosInstance.get('/users/' + id, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get user: " + err);
    }
  }
  async updateUser(id: string | null, data: any) {
    try {
      const res = await this.axiosInstance.put('/users/' + id, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't update user: " + err);
    }
  }
}
export default AuthClient;
