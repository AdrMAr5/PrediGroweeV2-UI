import React from 'react';
import { QuestionData, ResponseData, UserDetails } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { QuestionDetailsModal } from '@/components/ui/QuestionDetailsModal/QuestionDetailsModal';
import UserDetailsModal from '@/components/ui/UserDetailsModal/UserDetailsModal';

const AdminResponsesPanel = () => {
  const [responses, setResponses] = React.useState<ResponseData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedQuestion, setSelectedQuestion] = React.useState<QuestionData | null>(null);
  const [selectedUserDetails, setSelectedUserDetails] = React.useState<UserDetails | null>(null);

  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadResponses = async () => {
      try {
        const data = await adminClient.getAllResponses();
        setResponses(data);
      } catch {
        setError('Failed to load responses');
      } finally {
        setIsLoading(false);
      }
    };
    loadResponses();
  }, [adminClient]);

  const dateConverter = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
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
              <TableCell>User ID</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Is correct</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((res, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    onClick={async () => {
                      setSelectedQuestion(await adminClient.getQuestionById(res.questionId));
                    }}
                  >
                    {res.questionId}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      setSelectedUserDetails(await adminClient.getUserDetails(res.userId));
                    }}
                  >
                    {res.userId}
                  </Button>
                </TableCell>
                <TableCell>{res.answer}</TableCell>
                <TableCell>{res.isCorrect ? 'Yes' : 'No'}</TableCell>
                <TableCell>{dateConverter(res.time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <QuestionDetailsModal
        open={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        question={selectedQuestion}
        onUpdate={async (updated) => {
          console.log('updating question', updated);
        }}
        fetchStats={async () => {
          return adminClient.getQuestionStats(selectedQuestion?.id || 0);
        }}
        editable={false}
      />
      <UserDetailsModal
        open={!!selectedUserDetails}
        onClose={() => setSelectedUserDetails(null)}
        userDetails={selectedUserDetails}
        onRoleChange={async (id, role) => {
          try {
            await adminClient.updateUser(id.toString(), { role: role });
          } catch {
            setError('Failed to update user role');
          }
        }}
      />
    </>
  );
};

export default AdminResponsesPanel;
