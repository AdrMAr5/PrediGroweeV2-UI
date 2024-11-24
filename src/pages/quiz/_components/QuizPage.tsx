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
  Box,
} from '@mui/material';
import { useQuizContext } from '@/components/contexts/QuizContext';
import { useMediaQuery } from '@mui/system';
import { QuestionData, QuizMode } from '@/types';
import axios from 'axios';
import InfoTip from './InfoTip';
import { IMAGES_SERVICE_URL } from '@/Envs';
import ImagesClient from '@/Clients/ImagesClient';

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
  const [imageNumber, setImageNumber] = React.useState<number>(0);
  const { quizClient } = useQuizContext();
  const theme = useTheme();
  const notLarge = useMediaQuery(theme.breakpoints.down('lg'));
  const notMedium = useMediaQuery(theme.breakpoints.down('md'));
  const [imageSrc, setImageSrc] = React.useState<Record<string, string>>({ '1': '', '2': '' });
  const imagesClient = React.useMemo(() => new ImagesClient(IMAGES_SERVICE_URL), []);

  const finishQuizSession = useCallback(async () => {
    if (growthDirection === '' && mode !== 'educational') {
      alert('Please select a growth direction');
      return;
    }
    try {
      await quizClient.submitAnswer(
        sessionId,
        growthDirection,
        window.innerWidth,
        window.innerHeight
      );
      await quizClient.finishQuiz(sessionId);
      nextStep();
    } catch (error) {
      console.error(error);
    }
  }, [quizClient, sessionId, nextStep, growthDirection, mode]);
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
        await quizClient.submitAnswer(
          sessionId,
          growthDirection,
          window.innerWidth,
          window.innerHeight
        );
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
      const data = await quizClient.submitAnswer(
        sessionId,
        growthDirection,
        window.innerWidth,
        window.innerHeight
      );
      setCorrectAnswer(data.correct);
    } catch (error) {
      console.error(error);
    }
    setShowCorrect(true);
  };

  React.useEffect(() => {
    getQuestion();
    setQuestionLoading(false);
  }, [getQuestion]);
  React.useEffect(() => {
    const fetchImage = async (path: string) => {
      try {
        const res = await axios.get(
          IMAGES_SERVICE_URL + '/questions/' + questionData?.id.toString() + '/image/' + path,
          {
            responseType: 'blob',
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
          }
        );
        const imageUrl = URL.createObjectURL(res.data);
        setImageSrc((prev) => ({ ...prev, [path]: imageUrl }));
      } catch (error) {
        console.error(error);
      }
    };
    if (questionData) {
      fetchImage('1');
      fetchImage('2');
    }
  }, [questionData]);

  if (questionLoading || !questionData) {
    return <Typography>Loading...</Typography>;
  }

  const renderImage = (path: string, alt: string) => (
    <Box component="img" alt={alt} src={imageSrc[path]} maxWidth="100%" maxHeight="100%" />
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
                <InfoTip
                  paramId={param.id}
                  title={param.name}
                  description={param.description}
                  referenceValues={param.referenceValues}
                  imagesClient={imagesClient}
                />
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
    if (notMedium)
      return (
        <Grid2 container spacing={2} justifyContent="space-around">
          {imageNumber == 0 ? (
            <Grid2 size={12}>{renderImage('1', 'xray1')}</Grid2>
          ) : (
            <Grid2 size={12}>{renderImage('2', 'xray2')}</Grid2>
          )}
          <Grid2 size={12}>
            <Stack direction="row" justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => {
                  setImageNumber(0);
                }}
                disabled={imageNumber == 0}
              >
                Image 1
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setImageNumber(1);
                }}
                disabled={imageNumber == 1}
              >
                Image 2
              </Button>
            </Stack>
          </Grid2>
          <Grid2 size={12} maxWidth="700px">
            {renderTable()}
          </Grid2>
        </Grid2>
      );
    if (notLarge)
      return (
        <Grid2 container spacing={4} justifyContent="space-around">
          <Grid2 size={6}>{renderImage('1', 'xray1')}</Grid2>
          <Grid2 size={6}>{renderImage('2', 'xray2')}</Grid2>
          <Grid2 size={12} maxWidth="700px">
            {renderTable()}
          </Grid2>
        </Grid2>
      );
    return (
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={4}>{renderImage('1', 'xray1')}</Grid2>
        <Grid2 size={4} maxWidth="700px">
          {renderTable()}
        </Grid2>
        <Grid2 size={4}>{renderImage('2', 'xray2')}</Grid2>
      </Grid2>
    );
  };

  return (
    <Card sx={{ margin: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <CardHeader
        title={`Patient ${questionData?.case.code || 'Unknown'}`}
        subheader={`Gender: ${questionData?.case.gender || 'Unknown'}`}
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
              {questionData?.options?.map((option) => {
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
          <Button onClick={finishQuizSession} disabled={growthDirection === ''}>
            Finish
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuizPage;
