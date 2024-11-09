import { Box, Grid2, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import { QuestionResult } from './results';
import axios from 'axios';

type QuizResultGridItemProps = {
  question: QuestionResult;
  index: number;
};

const QuizResultGridItem = ({ question, index }: QuizResultGridItemProps) => {
  const [imageSrc, setImageSrc] = React.useState<Record<string, string>>({
    '1': '',
    '2': '',
    '3': '',
  });
  const renderAge = (path: string) => {
    switch (path) {
      case '1':
        return <Typography>Age: 9</Typography>;
      case '2':
        return <Typography>Age: 12</Typography>;
      case '3':
        return <Typography>Age: 16</Typography>;
      default:
        return 'Unknown';
    }
  };
  const renderImage = (path: string, alt: string) => (
    <Box>
      {renderAge(path)}
      <Box
        component="img"
        alt={alt}
        src={imageSrc[path]}
        sx={{
          maxWidth: '100%',
          maxHeight: '290px', // Adjust this value to control image height
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
  React.useEffect(() => {
    const fetchImage = async (path: string) => {
      try {
        const res = await axios.get('https://predigrowee.agh.edu.pl/api/images' + path, {
          responseType: 'blob',
          headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
        });
        const imageUrl = URL.createObjectURL(res.data);
        setImageSrc((prev) => ({ ...prev, [path]: imageUrl }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage('1');
    fetchImage('2');
    fetchImage('3');
  }, []);
  return (
    <Grid2 size={12} key={question?.questionID}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: question?.isCorrect ? 'success.light' : 'error.light',
          '&:hover': {
            bgcolor: question?.isCorrect ? 'success.200' : 'error.200',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography color="text.secondary">Question {index + 1}</Typography>
            <Typography fontWeight="medium">Your answer: {question?.answer}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {question?.isCorrect ? (
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
        <Grid2 container direction="row" size={12} spacing={2}>
          {Object.keys(imageSrc).map((key) => (
            <Grid2 columns={4} key={key}>
              {renderImage(key, `Question ${index + 1} image ${key}`)}
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </Grid2>
  );
};
export default QuizResultGridItem;
