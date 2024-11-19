import React from 'react';
import { Alert, Box, CardContent, CardHeader, Typography } from '@mui/material';
import { QuestionOption } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';

const OptionsManagement = () => {
  const [options, setOptions] = React.useState<QuestionOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  console.log(ADMIN_SERVICE_URL);
  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await adminClient.getAllOptions();
        setOptions(data);
      } catch {
        setError('Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };
    loadOptions();
  }, []);

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
      <CardHeader title="Manage question answer options" />
      <CardContent>
        <Typography fontWeight="bolder" variant="h5">
          Current options:
        </Typography>
        {options.map((option, index) => (
          <p key={index}>{option.option}</p>
        ))}
      </CardContent>
    </>
  );
};
export default OptionsManagement;
