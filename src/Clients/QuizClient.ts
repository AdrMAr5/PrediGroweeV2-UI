import BaseClient from '@/Clients/BaseClient';

class QuizClient extends BaseClient {
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
  async getUserQuizSessions() {
    try {
      const res = await this.axiosInstance.get('/sessions');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get quiz sessions: " + err);
    }
  }
  async startQuiz(mode: string, screenWidth: number, screenHeight: number) {
    try {
      const res = await this.axiosInstance.post('/new', { mode, screenWidth, screenHeight });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't start quiz: " + err);
    }
  }
  async getQuestion(sessionId: string, questionId: number) {
    try {
      const res = await this.axiosInstance.get(`/${sessionId}/question/${questionId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get question: " + err);
    }
  }
  async getNextQuestion(sessionId: string) {
    try {
      const res = await this.axiosInstance.get(`/${sessionId}/nextQuestion`);
      if (res.status === 204) {
        return null;
      }
      return res.data;
    } catch (err) {
      throw new Error("Couldn't get next question" + err);
    }
  }

  async submitAnswer(sessionId: string, answer: string) {
    try {
      const res = await this.axiosInstance.post(`${sessionId}/answer`, { answer });
      return res.data;
    } catch (err) {
      throw new Error("Couldn't submit answer: " + err);
    }
  }
  async finishQuiz(sessionId: string) {
    try {
      const res = await this.axiosInstance.post(`${sessionId}/finish`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't finish quiz: " + err);
    }
  }
}
export default QuizClient;
