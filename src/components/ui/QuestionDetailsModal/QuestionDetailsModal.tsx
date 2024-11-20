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
  TextField,
  Grid2,
} from '@mui/material';
import { QuestionData, QuestionStats } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import axios from 'axios';

type QuestionDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  question: QuestionData | null;
  fetchStats?: () => Promise<QuestionStats>;
  onUpdate?: (updatedQuestion: QuestionData) => Promise<void>;
  editable?: boolean;
};

export const QuestionDetailsModal: React.FC<QuestionDetailsDialogProps> = ({
  open,
  onClose,
  question,
  fetchStats,
  onUpdate,
  editable = true,
}) => {
  const [stats, setStats] = React.useState<QuestionStats | null>(null);
  const [editMode, setEditMode] = React.useState(false);
  const [editedQuestion, setEditedQuestion] = React.useState<QuestionData | null>(null);
  const [imagesSrc, setImagesSrc] = React.useState<Record<string, string>>({
    '1': '',
    '2': '',
    '3': '',
  });
  const [showImages, setShowImages] = React.useState(false);

  React.useEffect(() => {
    if (question && fetchStats) {
      const fetchQuestionStats = async () => {
        try {
          const stats = await fetchStats();
          setStats(stats);
        } catch (error) {
          console.error('Failed to fetch question stats:', error);
        }
      };
      fetchQuestionStats();
    }
  }, [question]);

  React.useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  if (!question || !editedQuestion) return null;

  const handleSave = async () => {
    try {
      if (onUpdate) {
        await onUpdate(editedQuestion);
      }
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleCancel = () => {
    setEditedQuestion(question);
    setEditMode(false);
  };

  const handleFetchImage = async (path: string) => {
    try {
      const res = await axios.get(
        'https://predigrowee.agh.edu.pl/api/images/' + editedQuestion.id + '/image/' + path,
        {
          responseType: 'blob',
          headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
        }
      );
      const imageUrl = URL.createObjectURL(res.data);
      setImagesSrc((prev) => ({ ...prev, [path]: imageUrl }));
    } catch (error) {
      console.error(error);
    }
  };

  const renderImage = (path: string, alt: string) => (
    <Box>
      <Box
        component="img"
        alt={alt}
        src={imagesSrc[path]}
        sx={{
          maxWidth: { xs: '100%', md: '350px' },
          width: 'auto',
          objectFit: 'scale-down',
        }}
      />
    </Box>
  );

  const updateValue = (path: string, value: any) => {
    setEditedQuestion((prev) => {
      if (!prev) return null;
      const newQuestion = { ...prev };
      const keys = path.split('.');
      let current: any = newQuestion;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newQuestion;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Question Details
        {editable ? (
          !editMode ? (
            <IconButton onClick={() => setEditMode(true)} sx={{ float: 'right' }}>
              <EditIcon />
            </IconButton>
          ) : (
            <Box sx={{ float: 'right' }}>
              <IconButton onClick={handleSave} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="error">
                <CancelIcon />
              </IconButton>
            </Box>
          )
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID
                  </Typography>
                  <Typography>{editedQuestion.id}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Group
                  </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={editedQuestion.group}
                      onChange={(e) => updateValue('group', e.target.value)}
                    />
                  ) : (
                    <Typography>{editedQuestion.group}</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
          {/* images */}
          <Typography variant="h6" gutterBottom>
            Images{' '}
            <IconButton
              onClick={() => {
                setShowImages(!showImages);
                handleFetchImage('1');
                handleFetchImage('2');
                handleFetchImage('3');
              }}
            >
              {showImages ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Typography>
          {showImages && (
            <Grid2 container direction="row" size={12} spacing={2}>
              {Object.keys(imagesSrc || {})?.map((key) => (
                <Grid2 columns={4} key={key}>
                  {renderImage(key, `image ${key}`)}
                </Grid2>
              ))}
            </Grid2>
          )}

          {/* Case Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Case Information <strong>{editedQuestion.case.code}</strong>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Parameters
                  </Typography>
                  {editedQuestion.case.parameters.map((param, index) => (
                    <Box key={param.id} sx={{ my: 1 }}>
                      <Typography variant="subtitle2">{param.name}</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          {editMode ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={editedQuestion.case.parametersValues[index].value1}
                              onChange={(e) => {
                                const values = [...editedQuestion.case.parametersValues];
                                values[index] = {
                                  ...values[index],
                                  value1: parseFloat(e.target.value),
                                };
                                updateValue('case.parametersValues', values);
                              }}
                              type="number"
                            />
                          ) : (
                            <Typography>
                              {editedQuestion.case.parametersValues[index].value1}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          {editMode ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={editedQuestion.case.parametersValues[index].value2}
                              onChange={(e) => {
                                const values = [...editedQuestion.case.parametersValues];
                                values[index] = {
                                  ...values[index],
                                  value2: parseFloat(e.target.value),
                                };
                                updateValue('case.parametersValues', values);
                              }}
                              type="number"
                            />
                          ) : (
                            <Typography>
                              {editedQuestion.case.parametersValues[index].value2}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          {editMode ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={editedQuestion.case.parametersValues[index].value3}
                              onChange={(e) => {
                                const values = [...editedQuestion.case.parametersValues];
                                values[index] = {
                                  ...values[index],
                                  value3: parseFloat(e.target.value),
                                };
                                updateValue('case.parametersValues', values);
                              }}
                              type="number"
                            />
                          ) : (
                            <Typography>
                              {editedQuestion.case.parametersValues[index].value3}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Options */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Answer Options
            </Typography>
            <Stack direction="row" spacing={2}>
              {editedQuestion.options.map((option, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    bgcolor: option === editedQuestion.correct ? 'success.light' : 'inherit',
                  }}
                >
                  {editMode ? (
                    <TextField
                      size="small"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editedQuestion.options];
                        newOptions[index] = e.target.value;
                        updateValue('options', newOptions);
                      }}
                    />
                  ) : (
                    <Typography>{option}</Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* Stats Section */}
          {stats && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Question Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Attempts
                    </Typography>
                    <Typography>{stats.total}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Success Rate
                    </Typography>
                    <Typography>
                      {((stats.correct / stats.total) * 100).toFixed(1)}% ({stats.correct}/
                      {stats.total})
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDetailsModal;
