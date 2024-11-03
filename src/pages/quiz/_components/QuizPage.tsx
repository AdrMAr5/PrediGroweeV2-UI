import React, { useCallback } from 'react';
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
import Image from 'next/image';
import xray1 from '../../../../public/xray1.jpg';
import xray2 from '../../../../public/xray2.jpg';
import { useMediaQuery } from '@mui/system';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { QuestionData, QuizMode } from '@/types';

const QuizPage = ({
  nextStep,
  sessionId,
  mode,
}: {
  nextStep: () => void;
  sessionId: string;
  mode: QuizMode;
}) => {
  const [growthDirection, setGrowthDirection] = React.useState('');
  const [questionData, setQuestionData] = React.useState<QuestionData>();
  const [questionLoading, setQuestionLoading] = React.useState(true);
  const [showCorrect, setShowCorrect] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState<string>('');
  const { quizClient } = useQuizContext();
  const theme = useTheme();
  const notLarge = useMediaQuery(theme.breakpoints.down('lg'));
  console.log(questionData);
  const finishQuizSession = useCallback(async () => {
    try {
      await quizClient.finishQuiz(sessionId);
      nextStep();
    } catch (error) {
      console.error(error);
    }
  }, [quizClient, sessionId, nextStep]);
  const getQuestion = useCallback(async () => {
    try {
      const data = await quizClient.getNextQuestion(sessionId);
      if (!data) {
        await finishQuizSession();
      }
      setQuestionData(data);
    } catch (error) {
      console.error(error);
    }
  }, [quizClient, sessionId, finishQuizSession]);
  const handleClickNext = async () => {
    if (growthDirection === '' && mode !== 'educational') {
      alert('Please select a growth direction');
      return;
    }
    try {
      if (mode !== 'educational') {
        await quizClient.submitAnswer(sessionId, growthDirection);
      }
      await getQuestion();
    } catch (error) {
      console.error(error);
    }
    setShowCorrect(false);
    setGrowthDirection('');
  };
  const handleSubmitAnswer = async () => {
    try {
      const data = await quizClient.submitAnswer(sessionId, growthDirection);
      setCorrectAnswer(data.correct);
      console.log(data.correct);
    } catch (error) {
      console.error(error);
    }
    setShowCorrect(true);
  };

  React.useEffect(() => {
    getQuestion();
    setQuestionLoading(false);
    console.log('effect');
  }, [getQuestion]);

  if (questionLoading || !questionData) {
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
            <TableCell align="left">Age of {questionData?.case?.age1}</TableCell>
            <TableCell align="center">Parameter</TableCell>
            <TableCell align="right">Age of {questionData?.case?.age2}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionData?.case.parameters?.map((param, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                {questionData?.case?.parametersValues[index].value1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {param.name}
              </TableCell>
              <TableCell align="right">
                {questionData.case.parametersValues[index].value2}
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
        title={`Patient ${questionData.case.code || 'Unknown'}`}
        subheader={`Gender: ${questionData.case.gender || 'Unknown'}`}
      />
      <CardContent>
        <Stack spacing={4}>
          {renderContent()}
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Please try to predict the direction of facial growth at the age of{' '}
              {questionData?.predictionAge}
            </FormLabel>
            <RadioGroup
              aria-label="growth-direction"
              name="growth-direction"
              value={growthDirection}
              onChange={(e) => {
                if (!showCorrect) {
                  setGrowthDirection(e.target.value);
                }
              }}
            >
              {questionData.options?.map((option) => {
                return showCorrect ? (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={correctAnswer === option ? { color: 'green' } : { color: 'red' }}
                  />
                ) : (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          {mode !== 'educational' || showCorrect ? (
            <Button
              onClick={handleClickNext}
              variant="contained"
              disabled={growthDirection === '' && mode != 'educational'}
            >
              Next
            </Button>
          ) : (
            <Button onClick={() => handleSubmitAnswer()} variant="contained">
              Show Correct Answer
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuizPage;
