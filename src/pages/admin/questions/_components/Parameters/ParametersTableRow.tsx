import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { Parameter } from '@/types';
import CheckIcon from '@mui/icons-material/Check';

type ParametersTableRowProps = {
  parameter: Parameter;
  handleUpdate: (param: Parameter) => void;
};
const ParametersTableRow = ({ parameter, handleUpdate }: ParametersTableRowProps) => {
  const [open, setOpen] = React.useState(false);
  const [updatedParameter, setUpdatedParameter] = React.useState<Parameter>(parameter);

  if (!parameter || !parameter.id) return null;

  return (
    <>
      <TableRow key={parameter.id}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{parameter.id}</TableCell>
        <TableCell>{parameter.name}</TableCell>
        <TableCell>{parameter.description}</TableCell>
        <TableCell>{parameter.referenceValues}</TableCell>
      </TableRow>
      {open && (
        <TableRow key={parameter.id.toString() + 'expanded'}>
          <TableCell />
          <TableCell>
            <IconButton
              onClick={() => {
                handleUpdate(updatedParameter);
                parameter = updatedParameter;
                setOpen(!open);
              }}
            >
              <CheckIcon color="primary" />
            </IconButton>
          </TableCell>
          <TableCell>
            <TextField
              name="name"
              defaultValue={parameter.name}
              onChange={(e) => {
                setUpdatedParameter({ ...updatedParameter, name: e.target.value });
              }}
              fullWidth
              inputProps={{ style: { fontSize: 13 } }}
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              name="description"
              defaultValue={parameter.description}
              onChange={(e) => {
                setUpdatedParameter({ ...updatedParameter, description: e.target.value });
              }}
              fullWidth
              inputProps={{ style: { fontSize: 13 } }}
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              name="reference values"
              defaultValue={parameter.referenceValues}
              onChange={(e) => {
                setUpdatedParameter({ ...updatedParameter, referenceValues: e.target.value });
              }}
              fullWidth
              inputProps={{ style: { fontSize: 13 } }}
              size="small"
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
export default ParametersTableRow;
