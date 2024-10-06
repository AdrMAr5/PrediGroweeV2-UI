import React, { useMemo } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import theme from '../theme';
import { AuthContextProvider } from '@/components/contexts/AuthContext';

// Dynamic imports
const QuizContextProvider = dynamic(() =>
  import('@/components/contexts/QuizContext').then((mod) => mod.QuizContextProvider)
);

const quizPaths = ['/startQuiz', '/quiz/[sessionId]'];

const Layout = React.memo(({ children }: { children: React.ReactNode }) => (
  <React.Fragment>
    <Head>
      <title>My Next.js App</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </React.Fragment>
));

Layout.displayName = 'Layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const isQuizPage = useMemo(
    () => quizPaths.some((path) => router.pathname === path),
    [router.pathname]
  );

  return (
    <Layout>
      <AuthContextProvider>
        {isQuizPage ? (
          <QuizContextProvider>
            <Component {...pageProps} />
          </QuizContextProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContextProvider>
    </Layout>
  );
}

export default React.memo(MyApp);
