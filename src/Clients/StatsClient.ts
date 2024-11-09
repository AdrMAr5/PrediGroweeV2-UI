import BaseClient from '@/Clients/BaseClient';
import { SurveyFormValues } from '@/pages/register/survey';
import { AxiosError } from 'axios';

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

  async saveUserSurveyAnswers(answers: SurveyFormValues) {
    try {
      await this.axiosInstance.post('/survey', answers);
    } catch (err) {
      const axiosError = err as AxiosError; // Explicitly cast to AxiosError

      if (axiosError.response?.status === 409) {
        throw new Error('A conflict occurred: Survey answers already exist.');
      } else {
        throw new Error('An error occurred while saving survey answers.');
      }
    }
  }
}
export default StatsClient;
