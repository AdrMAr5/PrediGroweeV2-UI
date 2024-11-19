import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import ParametersTableRow from './ParametersTableRow';
import { Parameter } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';

const ParametersTable = () => {
  const [parameters, setParameters] = React.useState<Parameter[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadParameters = async () => {
      try {
        const data = await adminClient.getAllParameters();
        setParameters(data);
      } catch {
        setError('Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };
    loadParameters();
  }, []);

  const handleUpdate = async (param: Parameter) => {
    try {
      await adminClient.updateParameter(param.id.toString(), param);
      setParameters(parameters.map((p) => (p.id === param.id ? param : p)));
    } catch {
      setError('Failed to update parameter');
    }
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
              <TableCell />
              <TableCell width="75px">
                <strong>ID</strong>
              </TableCell>
              <TableCell width="165px">
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell width="115px">
                <strong>Reference value</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((param, index) => (
              <ParametersTableRow
                parameter={param}
                handleUpdate={handleUpdate}
                key={index}
              ></ParametersTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ParametersTable;
