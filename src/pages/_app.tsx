import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { AuthContextProvider } from '@/components/contexts/AuthContext';
import { QuizContextProvider } from '@/components/contexts/QuizContext';
import { AppProps } from 'next/app';

const quizPaths = ['/startQuiz', '/quiz/[sessionId]'];

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isQuizPage = quizPaths.some((path) => router.pathname === path);

  return (
    <React.Fragment>
      <Head>
        <title>My Next.js App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          {isQuizPage ? (
            <QuizContextProvider>
              <Component {...pageProps} />
            </QuizContextProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
