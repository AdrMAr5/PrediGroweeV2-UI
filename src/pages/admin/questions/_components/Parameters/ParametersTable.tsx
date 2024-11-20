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
  Button,
} from '@mui/material';
import ParametersTableRow from './ParametersTableRow';
import { Parameter } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import NewParameterRow from './NewParameterRow';

const ParametersTable = () => {
  const [parameters, setParameters] = React.useState<Parameter[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showNewRow, setShowNewRow] = React.useState(false);

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

  const handleCreate = async (param: Omit<Parameter, 'id'>) => {
    try {
      const newParameter = await adminClient.createParameter(param);
      setParameters([...parameters, newParameter]);
      setShowNewRow(false);
    } catch {
      setError('Failed to create parameter');
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
              <ParametersTableRow parameter={param} handleUpdate={handleUpdate} key={index} />
            ))}
            {showNewRow && (
              <NewParameterRow onSave={handleCreate} onCancel={() => setShowNewRow(false)} />
            )}
            <TableRow>
              <TableCell colSpan={5}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setShowNewRow(true)}
                  disabled={showNewRow}
                >
                  Add new parameter
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ParametersTable;
