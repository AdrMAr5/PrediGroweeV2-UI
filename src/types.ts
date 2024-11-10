type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

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
};
type QuizMode = 'educational' | 'timeLimited' | 'classic';
const QUIZ_MODES: QuizMode[] = ['educational', 'timeLimited', 'classic'];
type QuizState = {
  sessionId: string;
  step: 'start' | 'quiz' | 'results';
  mode: QuizMode;
};

export type { Parameter, ParameterValue, QuestionCase, QuestionData, QuizState, QuizMode };
export { QUIZ_MODES };
