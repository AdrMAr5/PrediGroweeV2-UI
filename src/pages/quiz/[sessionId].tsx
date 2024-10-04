import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
} from '@mui/material';
import axios from 'axios';

type QuestionData = {
  PatientCode: string;
  Gender: string;
  Ages: any;
  Parameters: any;
  Images: any;
};

const QuizPage = () => {
  const [growthDirection, setGrowthDirection] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);

  const handleClickNext = async () => {
    if (growthDirection === '') {
      alert('Please select a growth direction');
      return;
    }
    // call API to submit answer
    // if success, fetch next question
  };

  if (!questionData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Patient {questionData.PatientCode || 'Unknown'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gender: {questionData.Gender || 'Unknown'}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Card style={{ width: '45%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Photo at the age of {questionData?.Ages?.Age1}
            </Typography>
            <img
              src="/api/placeholder/300/300"
              alt={`X-ray at age ${questionData?.Ages?.Age1}`}
              style={{ width: '100%' }}
            />
          </CardContent>
        </Card>

        <Card style={{ width: '45%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Photo at the age of {questionData?.Ages?.Age2}
            </Typography>
            <img
              src="/api/placeholder/300/300"
              alt={`X-ray at age ${questionData?.Ages?.Age2}`}
              style={{ width: '100%' }}
            />
          </CardContent>
        </Card>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parameter</TableCell>
              <TableCell align="right">Age of {questionData?.Ages?.Age1}</TableCell>
              <TableCell align="right">Age of {questionData?.Ages?.Age2}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionData?.Parameters[questionData?.Ages?.Age1]?.map((param, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {param.Name}
                </TableCell>
                <TableCell align="right">{param.Value}</TableCell>
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

      <Stack direction="column" mt={4} maxWidth="1000px" marginX="auto">
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
            <FormControlLabel value="vertical" control={<Radio />} label="predominantly vertical" />
            <FormControlLabel value="mixed" control={<Radio />} label="mixed" />
          </RadioGroup>
        </FormControl>
        <Button onClick={handleClickNext}>Next</Button>
      </Stack>
    </div>
  );
};

export default QuizPage;
