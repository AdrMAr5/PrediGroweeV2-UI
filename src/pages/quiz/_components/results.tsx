import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid2,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StatsClient from '@/Clients/StatsClient';
import { STATS_SERVICE_URL } from '@/Envs';
import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';

type QuizResults = {
  mode: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  questions: {
    questionID: string;
    answer: string;
    isCorrect: boolean;
  }[];
};

const QuizResultsPage = ({ sessionId, newQuiz }: { sessionId: string; newQuiz: () => void }) => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const statsClient = new StatsClient(STATS_SERVICE_URL);

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await statsClient.getQuizResults(sessionId);
        setResults(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchResults();
  }, [sessionId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">Error loading results. Please try again later.</Alert>
      </Box>
    );
  }

  if (!results) return null;

  const percentageScore = (results.accuracy * 100).toFixed(1);

  return (
    <>
      <TopNavBar />
      <Box maxWidth="lg" mx="auto" p={3}>
        <Grid2 container spacing={3}>
          {/* Summary Card */}
          <Grid2 size={12}>
            <Card>
              <CardHeader title="Quiz Results Summary" sx={{ textAlign: 'center' }} />
              <CardContent>
                <Grid2 container spacing={3}>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'grey.50',
                      }}
                    >
                      <Typography color="text.secondary" gutterBottom>
                        Mode
                      </Typography>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        {results.mode}
                      </Typography>
                    </Paper>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'grey.50',
                      }}
                    >
                      <Typography color="text.secondary" gutterBottom>
                        Score
                      </Typography>
                      <Typography variant="h6">
                        {results.correctAnswers} / {results.totalQuestions}
                      </Typography>
                    </Paper>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: 'grey.50',
                      }}
                    >
                      <Typography color="text.secondary" gutterBottom>
                        Accuracy
                      </Typography>
                      <Typography variant="h6">{percentageScore}%</Typography>
                    </Paper>
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>

          {/* Questions List */}
          <Grid2 size={12}>
            <Card>
              <CardHeader title="Question Details" />
              <Divider />
              <CardContent>
                <Grid2 container spacing={2}>
                  {results.questions?.map((question, index) => (
                    <Grid2 size={12} key={question.questionID}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: question.isCorrect ? 'success.light' : 'error.light',
                          '&:hover': {
                            bgcolor: question.isCorrect ? 'success.200' : 'error.200',
                          },
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center" gap={2}>
                            <Typography color="text.secondary">Question {index + 1}</Typography>
                            <Typography fontWeight="medium">
                              Your answer: {question.answer}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            {question.isCorrect ? (
                              <>
                                <CheckCircleIcon color="success" />
                                <Typography color="success.main">Correct</Typography>
                              </>
                            ) : (
                              <>
                                <CancelIcon color="error" />
                                <Typography color="error.main">Incorrect</Typography>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid2>
                  ))}
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
        <Stack my={2}>
          <Button onClick={newQuiz}>Start a new quiz</Button>
        </Stack>
      </Box>
    </>
  );
};

export default QuizResultsPage;
