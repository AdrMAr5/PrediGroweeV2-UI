import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import { Box, Card, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <Box>
      <TopNavBar />
      <Stack
        component="main"
        spacing={4}
        sx={{
          maxWidth: '1000px',
          width: '100%',
          marginX: 'auto',
          marginTop: 4,
          padding: 2,
        }}
      >
        <Typography variant="h3">Statistics</Typography>
        <Card>
          <CardHeader title="Classic mode" />
          <CardContent>
            <Typography>Number of quizzes: 0</Typography>
            <Typography>Number of questions: 0</Typography>
            <Typography>Number of correct answers: 0</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Time-limited mode" />
          <CardContent>
            <Typography>Number of quizzes: 0</Typography>
            <Typography>Number of questions: 0</Typography>
            <Typography>Number of correct answers: 0</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Educational mode" />
          <CardContent>
            <Typography>Number of quizzes: 0</Typography>
            <Typography>Number of questions: 0</Typography>
            <Typography>Number of correct answers: 0</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default AdminPage;
