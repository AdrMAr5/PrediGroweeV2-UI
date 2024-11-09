import React from 'react';
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
import { QuizMode, QUIZ_MODES } from '@/types';

type QuizFormValues = {
  mode: QuizMode;
};

const initialValues: QuizFormValues = {
  mode: 'classic',
};

const validationSchema = Yup.object().shape({
  mode: Yup.string().oneOf(QUIZ_MODES, 'Invalid quiz mode').required('Please select a quiz mode'),
});

export default function StartQuiz({
  nextStep,
}: {
  nextStep: (sessionId: string, mode: QuizMode) => void;
}) {
  const { quizClient } = useQuizContext();

  const handleSubmit = async (
    values: QuizFormValues,
    { setSubmitting }: FormikHelpers<QuizFormValues>
  ) => {
    setSubmitting(true);
    try {
      const data = await quizClient.startQuiz(values.mode, window.innerWidth, window.innerHeight);
      nextStep(data.session.sessionId, data.session.quizMode);
    } catch {
      alert('Failed to start quiz');
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
                      <FormControlLabel value="classic" control={<Radio />} label="Classic" />
                      <FormControlLabel
                        value="educational"
                        control={<Radio />}
                        label="Educational"
                        disabled
                      />
                      <FormControlLabel
                        value="timeLimited"
                        control={<Radio />}
                        label="Time Limited"
                        disabled
                      />
                    </RadioGroup>
                  </FormControl>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
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
