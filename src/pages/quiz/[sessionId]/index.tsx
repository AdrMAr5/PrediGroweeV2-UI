import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
  Button,
  CardHeader,
  useTheme,
  Grid2,
} from '@mui/material';
import { useQuizContext } from '@/components/contexts/QuizContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import xray1 from '../../../../public/xray1.jpg';
import xray2 from '../../../../public/xray2.jpg';
import { useMediaQuery } from '@mui/system';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type PatientAges = {
  Age1: number;
  Age2: number;
  PredictionAge: number;
};
type PatientParameter = {
  Name: string;
  Value: string;
};

type QuestionData = {
  PatientCode: string;
  Gender: string;
  Ages: PatientAges;
  Parameters: { [key: number]: PatientParameter[] };
  Images: string[];
};

const QuizPage = () => {
  const [growthDirection, setGrowthDirection] = React.useState('');
  // @ts-expect-error omit check for test
  const [questionData, setQuestionData] = React.useState<QuestionData>(null);
  const { quizClient } = useQuizContext();
  const router = useRouter();
  const sessionId = router.query.sessionId as string;
  const theme = useTheme();
  const notLarge = useMediaQuery(theme.breakpoints.down('lg'));
  const finishQuizSession = async () => {
    try {
      await quizClient.finishQuiz(sessionId);
      await router.push(`/quiz/${sessionId}/results`);
    } catch (error) {
      console.error(error);
    }
  };
  const getQuestion = async () => {
    if (sessionId === undefined) {
      return;
    }
    try {
      const data = await quizClient.getNextQuestion(sessionId);
      if (!data) {
        await finishQuizSession();
      }
      setQuestionData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickNext = async () => {
    if (growthDirection === '') {
      alert('Please select a growth direction');
      return;
    }
    try {
      await quizClient.submitAnswer(sessionId, growthDirection);
      await getQuestion();
    } catch (error) {
      console.error(error);
    }
    setGrowthDirection('');
  };
  React.useEffect(() => {
    const getQuestion2 = async () => {
      if (sessionId === undefined) {
        return;
      }
      try {
        const data = await quizClient.getNextQuestion(sessionId);
        if (!data) {
          await finishQuizSession();
        }
        setQuestionData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuestion2();
  }, [quizClient, sessionId]);
  if (!questionData) {
    return <Typography>Loading...</Typography>;
  }

  const renderImage = (src: StaticImport, alt: string) => (
    <Image alt={alt} src={src} layout="intrinsic" style={{ maxWidth: '100%', height: 'auto' }} />
  );
  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Age of {questionData?.Ages?.Age1}</TableCell>
            <TableCell align="center">Parameter</TableCell>
            <TableCell align="right">Age of {questionData?.Ages?.Age2}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionData?.Parameters[questionData?.Ages?.Age1]?.map((param, index) => (
            <TableRow key={index}>
              <TableCell align="left">{param.Value}</TableCell>
              <TableCell component="th" scope="row" align="center">
                {param.Name}
              </TableCell>
              <TableCell align="right">
                {questionData?.Parameters[questionData?.Ages.Age2]
                  ? questionData?.Parameters[questionData?.Ages.Age2][index].Value
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderContent = () => {
    if (notLarge)
      return (
        <Grid2 container spacing={4} justifyContent="space-around">
          <Grid2 size={6}>{renderImage(xray1, 'xray1')}</Grid2>
          <Grid2 size={6}>{renderImage(xray2, 'xray2')}</Grid2>
          <Grid2 size={12} maxWidth="700px">
            {renderTable()}
          </Grid2>
        </Grid2>
      );
    return (
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={4}>{renderImage(xray1, 'xray1')}</Grid2>
        <Grid2 size={4} maxWidth="700px">
          {renderTable()}
        </Grid2>
        <Grid2 size={4}>{renderImage(xray2, 'xray2')}</Grid2>
      </Grid2>
    );
  };

  return (
    <Card sx={{ margin: { xs: 2, md: 4 } }}>
      <CardHeader
        title={`Patient ${questionData.PatientCode || 'Unknown'}`}
        subheader={`Gender: ${questionData.Gender || 'Unknown'}`}
      />
      <CardContent>
        <Stack spacing={4}>
          {renderContent()}
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Please try to predict the direction of facial growth at the age of{' '}
              {questionData?.Ages?.PredictionAge}
            </FormLabel>
            <RadioGroup
              aria-label="growth-direction"
              name="growth-direction"
              value={growthDirection}
              onChange={(e) => setGrowthDirection(e.target.value)}
            >
              <FormControlLabel
                value="horizontal"
                control={<Radio />}
                label="predominantly horizontal"
              />
              <FormControlLabel
                value="vertical"
                control={<Radio />}
                label="predominantly vertical"
              />
              <FormControlLabel value="mixed" control={<Radio />} label="mixed" />
            </RadioGroup>
          </FormControl>
          <Button onClick={handleClickNext} variant="contained">
            Next
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuizPage;
