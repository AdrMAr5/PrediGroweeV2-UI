import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import AuthPagesLayout from '@/components/layouts/AuthPagesLayout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useQuizContext } from '@/components/contexts/QuizContext';

type QuizFormValues = {
  mode: 'educational' | 'timeLimited' | 'classic';
};

const initialValues: QuizFormValues = {
  mode: 'educational',
};

const validationSchema = Yup.object().shape({
  mode: Yup.string()
    .oneOf(['educational', 'limited_time', 'classic'])
    .required('Please select a quiz mode'),
});

export default function StartQuiz() {
  const { quizClient, setSessionId } = useQuizContext();
  const router = useRouter();
  React.useEffect(() => {
    const getSessions = async () => {
      try {
        const data = await quizClient.getUserQuizSessions();
        setSessionId(data.sessions[0].ID);
      } catch (error) {
        console.error(error);
      }
    };
    getSessions();
  }, [quizClient, setSessionId]);
  const handleSubmit = async (
    values: QuizFormValues,
    { setSubmitting }: FormikHelpers<QuizFormValues>
  ) => {
    setSubmitting(true);
    try {
      const data = await quizClient.startQuiz(values.mode);
      await router.push('/quiz/[sessionId]', `/quiz/${data.session.ID}`);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPagesLayout>
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardHeader title="Start a Quiz" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Select Quiz Mode</FormLabel>
                    <RadioGroup
                      aria-label="quiz-mode"
                      name="mode"
                      value={values.mode}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="educational"
                        control={<Radio />}
                        label="Educational"
                      />
                      <FormControlLabel
                        value="timeLimited"
                        control={<Radio />}
                        label="Time Limited"
                      />
                      <FormControlLabel value="classic" control={<Radio />} label="Classic" />
                    </RadioGroup>
                  </FormControl>
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#a5b4fc', '&:hover': { bgcolor: '#8c9eff' } }}
                  >
                    Start Quiz
                  </LoadingButton>
                </Form>
              )}
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </AuthPagesLayout>
  );
}
