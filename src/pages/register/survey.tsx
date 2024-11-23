import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { STATS_SERVICE_URL } from '@/Envs';
import StatsClient from '@/Clients/StatsClient';
import { useRouter } from 'next/router';
import { UserSurvey } from '@/types';

const SurveyPage = () => {
  const statsClient = new StatsClient(STATS_SERVICE_URL);
  const router = useRouter();
  const [formData, setFormData] = useState<UserSurvey>({
    name: '',
    surname: '',
    gender: '',
    age: 0,
    country: 'Poland',
    visionDefect: '',
    education: '',
    experience: '',
    acknowledgements: true,
  });
  const [isError, setIsError] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'age') {
      if (parseInt(value) < 1 || parseInt(value) > 120) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await statsClient.saveUserSurveyAnswers(formData);
      await router.push('/quiz');
    } catch {
      await router.push('/quiz');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ maxWidth: 500, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Survey
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name:"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Name"
            />
            <TextField
              label="Surname:"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Surname"
            />
            <TextField
              select
              label="Gender:"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Please select one of the options"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="prefer not to say">Prefer not to say</MenuItem>
            </TextField>

            {/* Age */}
            <TextField
              label="Age:"
              type="number"
              name="age"
              value={formData.age === 0 ? '' : formData.age}
              error={isError}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Age"
              inputProps={{ min: 0 }}
            />

            {/* Country of origin */}
            <TextField
              label="Country of origin:"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Vision Defect */}
            <TextField
              select
              label="Vision defect:"
              name="visionDefect"
              value={formData.visionDefect}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Please select one of the options"
            >
              <MenuItem value="I do not have any vision defects">
                I do not have any vision defects
              </MenuItem>
              <MenuItem value="I use correction glasses or contact lenses">
                I use correction glasses or contact lenses
              </MenuItem>
              <MenuItem value="I should use correction glasses or contact lenses but I do not use them now">
                I should use correction glasses or contact lenses but I do not use them now
              </MenuItem>
              <MenuItem value="I prefer not to say">I prefer not to say</MenuItem>
            </TextField>

            {/* Education */}
            <TextField
              select
              label="Education:"
              name="education"
              value={formData.education}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Please select one of the options"
            >
              <MenuItem value="Dental student">Dental student</MenuItem>
              <MenuItem value="Dental graduate">Dental graduate</MenuItem>
              <MenuItem value="General dental practitioner">General dental practitioner</MenuItem>
              <MenuItem value="Postgraduate orthodontic student">
                Postgraduate orthodontic student
              </MenuItem>
              <MenuItem value="Orthodontic specialist">Orthodontic specialist</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {/* Experience with cephalometric analysis */}
            <TextField
              select
              label="Experience with cephalometric analysis:"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="Please select one of the options"
            >
              <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
              <MenuItem value="1-3 years">1-3 years</MenuItem>
              <MenuItem value="3-7 years">3-7 years</MenuItem>
              <MenuItem value="7-10 years">7-10 years</MenuItem>
              <MenuItem value="More than 10 years">More than 10 years</MenuItem>
            </TextField>

            {/* Acknowledgement */}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                Would you like to be included in acknowledgements of our future papers?
              </FormLabel>
              <RadioGroup
                name="acknowledgements"
                value={formData.acknowledgements}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <Box textAlign="center" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isError || Object.values(formData).some((val) => val === '')}
              >
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SurveyPage;
