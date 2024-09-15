import React, { useState } from 'react';
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
import Image from 'next/image';
import axios from 'axios';

const measurementData = [
  { parameter: 'SN/MP (32°)', age9: 25.0, age12: 22.7 },
  { parameter: 'Facial Axis (90°)', age9: 85.4, age12: 85.5 },
  { parameter: 'Y-Axis (59.4°)', age9: 63.4, age12: 62.6 },
  { parameter: 'Point A to Nasion perpendicular (0-1 mm)', age9: -3.5, age12: -4.7 },
  { parameter: 'Pog to Nasion perpendicular (-8 to -6 mm)', age9: -11.8, age12: -15.6 },
  { parameter: 'Antegonial Notch Depth', age9: -3.6, age12: -2.7 },
  { parameter: 'Mn Base Angle', age9: 2.5, age12: 2.9 },
  { parameter: 'Mn Ramus Angle', age9: 113.6, age12: 109.7 },
  { parameter: 'SNPog (81°)', age9: 82.3, age12: 82.9 },
  { parameter: 'SNB (78°)', age9: 80.5, age12: 81.0 },
  { parameter: 'SNA (81°)', age9: 80.8, age12: 81.1 },
  { parameter: 'SN/PP', age9: 3.0, age12: 3.1 },
  { parameter: 'ANB (3°)', age9: -0.3, age12: -0.1 },
  { parameter: 'AFH:PFH (1.5)', age9: 1.3, age12: 1.3 },
];

const QuizPage = () => {
  const [growthDirection, setGrowthDirection] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const handleClickNext = () => {
    if (growthDirection === '') {
      alert('Please select a growth direction');
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    setGrowthDirection('');
  };
  React.useEffect(() => {
    const res = axios
      .get('http://localhost:8082/question/' + currentQuestion, { withCredentials: true })
      .catch((e) => {
        console.log(e);
      });
    console.log(res);
  }, [currentQuestion]);

  return (
    <Card sx={{ margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom align="center">
          Patient Br0366
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center">
          male
        </Typography>
        <Stack direction="row" columnGap={2} flexWrap="nowrap" mb={2}>
          <Image src="" alt="Patient at 9" width={500} height={500} />
          <TableContainer component={Paper} sx={{ minWidth: '280px' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Age of 9</TableCell>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Age of 12</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {measurementData.map((row) => (
                  <TableRow key={row.parameter}>
                    <TableCell>{row.age9}</TableCell>
                    <TableCell>{row.parameter}</TableCell>
                    <TableCell>{row.age12}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Image src="" alt="Patient at 12" width={500} height={500} />
        </Stack>
        {/*<Box display="flex" justifyContent="space-between" mb={2}>*/}
        {/*  <Box width="45%">*/}
        {/*    <Typography variant="h6" gutterBottom>*/}
        {/*      Photo at the age of 9*/}
        {/*    </Typography>*/}
        {/*    <Image src={age9} alt="Patient at 9" width={500} height={500} />*/}
        {/*  </Box>*/}

        {/*  <Box width="45%">*/}
        {/*    <Typography variant="h6" gutterBottom>*/}
        {/*      Photo at the age of 12*/}
        {/*    </Typography>*/}
        {/*    <Image src="/src/pages/quiz/age11.jpg" alt="Patient at 12" width={500} height={500} />*/}
        {/*  </Box>*/}
        {/*</Box>*/}

        <Stack direction="column" mt={4} maxWidth="1000px" marginX="auto">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Please try to predict the direction of facial growth at the age of 17
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
          <Button onClick={handleClickNext}>Next</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuizPage;
