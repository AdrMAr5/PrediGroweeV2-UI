import axios, { AxiosInstance } from 'axios';

class QuizClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    });
    this.axiosInstance.interceptors.response.use();
  }
  async getUserQuizSessions() {
    try {
      const res = await this.axiosInstance.get('/sessions');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get quiz sessions: " + err);
    }
  }
  async startQuiz(mode: string) {
    try {
      const res = await this.axiosInstance.post('/new', { mode });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't start quiz: " + err);
    }
  }
  async getQuestion(sessionId: number, questionId: number) {
    try {
      const res = await this.axiosInstance.get(`/${sessionId}/questions/${questionId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get question: " + err);
    }
  }
  async submitAnswer(id: number, answer: string) {
    try {
      const res = await this.axiosInstance.post(`/questions/${id}/submit`, { answer });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't submit answer: " + err);
    }
  }
  async finishQuiz(sessionId: number) {
    try {
      const res = await this.axiosInstance.post(`${sessionId}/finish`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't finish quiz: " + err);
    }
  }
}
export default QuizClient;
