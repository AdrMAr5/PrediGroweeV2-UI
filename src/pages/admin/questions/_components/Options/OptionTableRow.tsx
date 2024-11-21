import { Box, IconButton, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { QuestionOption } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

type ParametersTableRowProps = {
  option: QuestionOption;
  handleUpdate: (option: QuestionOption) => void;
  handleDelete: (id: string) => void;
};
const OptionTableRow = ({ option, handleUpdate, handleDelete }: ParametersTableRowProps) => {
  const [open, setOpen] = React.useState(false);
  const [updatedParameter, setUpdatedParameter] = React.useState<QuestionOption>(option);

  if (!option || !option.id) return null;

  return (
    <>
      <TableRow key={option.id}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(option.id.toString());
            }}
          >
            <DeleteIcon color="warning" />
          </IconButton>
        </TableCell>
        <TableCell>{option.id}</TableCell>
        <TableCell>{option.option}</TableCell>
        <TableCell>{option.questions}</TableCell>
      </TableRow>
      {open && (
        <TableRow key={option.id.toString() + 'expanded'}>
          <TableCell />
          <TableCell>
            <IconButton
              onClick={() => {
                handleUpdate(updatedParameter);
                option = updatedParameter;
                setOpen(!open);
              }}
            >
              <CheckIcon color="primary" />
            </IconButton>
          </TableCell>
          <TableCell>
            <Box maxWidth="250px">
              <TextField
                name="name"
                defaultValue={option.option}
                onChange={(e) => {
                  setUpdatedParameter({ ...updatedParameter, option: e.target.value });
                }}
                fullWidth
                inputProps={{ style: { fontSize: 13 } }}
                size="small"
              />
            </Box>
          </TableCell>
          <TableCell />
        </TableRow>
      )}
    </>
  );
};
export default OptionTableRow;
