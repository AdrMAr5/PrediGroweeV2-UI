import BaseClient from '@/Clients/BaseClient';

class StatsClient extends BaseClient {
  constructor(baseUrl: string) {
    super(baseUrl);
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    });
  }
  async getUserStats() {
    try {
      const res = await this.axiosInstance.get('/userStats');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get stats: " + err);
    }
  }
  async getQuizResults(sessionId: string) {
    try {
      const res = await this.axiosInstance.get(`/${sessionId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get quiz results: " + err);
    }
  }
}
export default StatsClient;
