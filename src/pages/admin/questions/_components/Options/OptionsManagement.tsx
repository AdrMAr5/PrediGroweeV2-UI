import React from 'react';
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
import { QuestionOption } from '@/types';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import OptionTableRow from './OptionTableRow';
import NewOptionRow from './NewOptionRow';

const OptionsManagement = () => {
  const [options, setOptions] = React.useState<QuestionOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showNewRow, setShowNewRow] = React.useState(false);

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
  }, [adminClient]);
  const handleUpdate = async (option: QuestionOption) => {
    try {
      await adminClient.updateOption(option.id.toString(), option);
      setOptions(options.map((p) => (p.id === option.id ? option : p)));
    } catch {
      setError('Failed to update parameter');
    }
  };
  const handleCreate = async (option: Omit<QuestionOption, 'id'>) => {
    try {
      const newOption = await adminClient.createOption(option);
      setOptions([...options, newOption]);
      setShowNewRow(false);
    } catch {
      setError('Failed to create parameter');
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await adminClient.deleteOption(id);
      setOptions(options.filter((p) => p.id.toString() !== id));
    } catch {
      setError('Failed to delete parameter');
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
              <TableCell width="120px">
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Used for questions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.map((option, index) => (
              <OptionTableRow
                option={option}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                key={index}
              />
            ))}
            {showNewRow && (
              <NewOptionRow onSave={handleCreate} onCancel={() => setShowNewRow(false)} />
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
                  Add new Option
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default OptionsManagement;
