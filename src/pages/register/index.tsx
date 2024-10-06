import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Link,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AuthPagesLayout from '../../components/layouts/AuthPagesLayout';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import RegisterValidate from './validate';
import { useAuthContext } from '@/components/contexts/AuthContext';

export type RegisterFormValues = {
  email: string;
  password: string;
  retypePassword: string;
  notRobot: boolean;
};
const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  retypePassword: '',
  notRobot: false,
};

export default function Register() {
  const { register } = useAuthContext();
  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(true);
    try {
      register(values.email, values.password);
      location.href = '/confirm';
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AuthPagesLayout>
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardHeader title="Register to PrediGrowee" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Box sx={{ mt: 1 }}>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={RegisterValidate}
              validateOnChange
            >
              {({ touched, errors, values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    value={values.retypePassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    required
                    fullWidth
                    name="retypePassword"
                    label="Retype password"
                    type="password"
                    id="retypePassword"
                    error={touched.retypePassword && Boolean(errors.retypePassword)}
                    helperText={touched.retypePassword && errors.retypePassword}
                  />
                  <Field
                    type="checkbox"
                    name="notRobot"
                    as={FormControlLabel}
                    control={<Checkbox />}
                    label="I am not a robot"
                  />
                  <FormHelperText color="error">
                    {touched.notRobot && errors.notRobot}
                  </FormHelperText>
                  {/* Add reCAPTCHA component here */}
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#a5b4fc', '&:hover': { bgcolor: '#8c9eff' } }}
                  >
                    Register
                  </LoadingButton>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link href="/login" variant="body2">
                      Login
                    </Link>
                    <br />
                    <Link href="/confirm" variant="body2">
                      Confirm account
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </AuthPagesLayout>
  );
}
