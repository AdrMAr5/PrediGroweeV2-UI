import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import { QuestionData } from '@/types';
import EditIcon from '@mui/icons-material/Edit';

interface QuestionDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  question: QuestionData | null;
}

export const QuestionDetailsModal: React.FC<QuestionDetailsDialogProps> = ({
  open,
  onClose,
  question,
}) => {
  const [editOptions, setEditOptions] = React.useState(false);
  if (!question) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Question Details</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Question ID
                  </Typography>
                  <Typography>{question.id}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Group
                  </Typography>
                  <Typography>{question.group}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Question Text
                  </Typography>
                  <Typography>
                    {question.question} {question.predictionAge}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Case Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Case Code
                  </Typography>
                  <Typography>{question.case.code}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography>{question.case.gender}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age 1
                  </Typography>
                  <Typography>{question.case.age1}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age 2
                  </Typography>
                  <Typography>{question.case.age2}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age 3
                  </Typography>
                  <Typography>{question.case.age3}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Answers Information{' '}
              {
                <IconButton
                  onClick={() => {
                    setEditOptions(!editOptions);
                  }}
                >
                  <EditIcon />
                </IconButton>
              }
            </Typography>
            <Stack direction="row" gap={2}>
              {question.options.map((option, index) => (
                <Paper key={index} sx={{ p: 2 }}>
                  {option === question.correct && (
                    <Typography variant="subtitle2" color="text.secondary">
                      correct
                    </Typography>
                  )}
                  <Typography>{option}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDetailsModal;
