import React from 'react';
import QuizPage from './_components/QuizPage';
import StartQuiz from './_components/startQuiz';
import QuizResultsPage from './_components/results';
import { QuizState } from './_components/types';

const QuizIndexPage = () => {
  const [quizState, setQuizState] = React.useState<QuizState>({
    step: 'start',
    sessionId: '',
    mode: 'educational',
  });
  switch (quizState.step) {
    case 'start':
      return (
        <StartQuiz
          nextStep={(sessionId: string, mode) => {
            setQuizState({ step: 'quiz', sessionId: sessionId, mode: mode });
          }}
        />
      );
    case 'quiz':
      return (
        <QuizPage
          sessionId={quizState.sessionId}
          mode={quizState.mode}
          nextStep={() => {
            setQuizState((state) => ({ ...state, step: 'results' }));
          }}
        />
      );
    case 'results':
      return (
        <QuizResultsPage
          sessionId={quizState.sessionId}
          newQuiz={() => {
            setQuizState({ step: 'start', sessionId: '', mode: 'educational' });
          }}
        />
      );
    default:
      return (
        <StartQuiz
          nextStep={(sessionId: string, mode) => {
            setQuizState({ step: 'quiz', sessionId: sessionId, mode: mode });
          }}
        />
      );
  }
};
export default QuizIndexPage;
