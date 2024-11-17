import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import StatsClient from '@/Clients/StatsClient';
import { STATS_SERVICE_URL } from '@/Envs';
import React, { useMemo } from 'react';
import { UserStats } from '@/types';

const AdminPage = () => {
  const statsClient = useMemo(() => new StatsClient(STATS_SERVICE_URL), []);
  const [stats, setStats] = React.useState<UserStats | null>(null);
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsClient.getUserStats();
        setStats(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStats();
  }, [statsClient]);
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
            <Typography>Number of questions: {stats?.totalQuestions['classic']}</Typography>
            <Typography>Number of correct answers: {stats?.correctAnswers['classic']}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Time-limited mode" />
          <CardContent>
            <Typography>Number of questions: {stats?.totalQuestions['timeLimited']}</Typography>
            <Typography>
              Number of correct answers: {stats?.correctAnswers['timeLimited']}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Educational mode" />
          <CardContent>
            <Typography>Number of questions: {stats?.totalQuestions['educational']}</Typography>
            <Typography>
              Number of correct answers: {stats?.correctAnswers['educational']}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default AdminPage;
