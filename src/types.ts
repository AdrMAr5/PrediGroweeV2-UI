type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
};
type UserRole = 'admin' | 'user';

export type { UserData };

type Parameter = {
  id: number;
  name: string;
  description: string;
  referenceValues: string;
};
type ParameterValue = {
  id: number;
  value1: number;
  value2: number;
  value3: number;
};
type QuestionCase = {
  id: number;
  code: string;
  gender: string;
  age1: number;
  age2: number;
  age3: number;
  parameters: Parameter[];
  parametersValues: ParameterValue[];
};

type QuestionData = {
  id: number;
  question: string;
  options: string[];
  predictionAge: number;
  case: QuestionCase;
  correct: string;
  group: number;
};
type QuizMode = 'educational' | 'timeLimited' | 'classic';

type QuestionOption = {
  id: number;
  option: string;
  questions?: number;
};

type UserStats = {
  accuracy: Record<QuizMode, number>;
  correctAnswers: Record<QuizMode, number>;
  totalQuestions: Record<QuizMode, number>;
};

type ResponseData = {
  userId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  time: string;
};
type QuestionStats = {
  questionId: number;
  total: number;
  correct: number;
};
type ActivityData = {
  date: string;
  total: number;
  correct: number;
};

const QUIZ_MODES: QuizMode[] = ['educational', 'timeLimited', 'classic'];
type QuizState = {
  sessionId: string;
  step: 'start' | 'quiz' | 'results';
  mode: QuizMode;
};

type UserDetails = {
  user: UserData;
  stats: UserStats;
};

type QuizSummary = {
  questions: number;
  activeSurveys: number;
};
type StatsSummary = {
  quizSessions: number;
  totalResponses: number;
  totalCorrect: number;
};

type AuthSummary = {
  users: number;
  activeUsers: number;
  lastRegistered: number;
};

type DashboardSummary = {
  quizSummary: QuizSummary;
  statsSummary: StatsSummary;
  authSummary: AuthSummary;
};

export type {
  Parameter,
  ParameterValue,
  QuestionCase,
  QuestionData,
  QuizState,
  QuizMode,
  UserStats,
  UserDetails,
  UserRole,
  QuestionOption,
  ResponseData,
  QuestionStats,
  ActivityData,
  DashboardSummary,
};
export { QUIZ_MODES };
