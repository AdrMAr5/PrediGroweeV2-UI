import React from 'react';
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Parameter } from '@/types';

type NewParameterRowProps = {
  onSave: (parameter: Omit<Parameter, 'id'>) => void;
  onCancel: () => void;
};

const initialState: Omit<Parameter, 'id'> = {
  name: '',
  description: '',
  referenceValues: '',
};

const NewParameterRow: React.FC<NewParameterRowProps> = ({ onSave, onCancel }) => {
  const [parameter, setParameter] = React.useState(initialState);

  const handleChange =
    (field: keyof typeof initialState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setParameter((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isValid = parameter.name && parameter.description;

  return (
    <TableRow>
      <TableCell>
        <IconButton color="primary" onClick={() => onSave(parameter)} disabled={!isValid}>
          <SaveIcon />
        </IconButton>
        <IconButton color="error" onClick={onCancel}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <em>New</em>
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          size="small"
          value={parameter.name}
          onChange={handleChange('name')}
          placeholder="Parameter name"
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          size="small"
          value={parameter.description}
          onChange={handleChange('description')}
          placeholder="Parameter description"
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          size="small"
          value={parameter.referenceValues}
          onChange={handleChange('referenceValues')}
          placeholder="Reference value"
        />
      </TableCell>
    </TableRow>
  );
};

export default NewParameterRow;
