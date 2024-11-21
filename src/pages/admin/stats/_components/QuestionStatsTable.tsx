import React from 'react';
import { QuestionStats } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import StatsTableRow from './StatsTableRow';

const QuestionStatsTable = () => {
  const [stats, setStats] = React.useState<QuestionStats[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await adminClient.getAllQuestionStats();
        setStats(data);
      } catch {
        setError('Failed to load responses');
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, [adminClient]);

  const fetchQuestion = async (questionId: string) => {
    return await adminClient.getQuestionById(questionId);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question ID</TableCell>
              <TableCell>Total answers</TableCell>
              <TableCell>Correct answers</TableCell>
              <TableCell>Accuracy</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat, index) => (
              <StatsTableRow stat={stat} fetchQuestion={fetchQuestion} key={index}></StatsTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default QuestionStatsTable;
