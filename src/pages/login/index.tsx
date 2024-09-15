import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  CardHeader,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import AuthPagesLayout from '../../components/layouts/AuthPagesLayout';
import LoginValidate from '@/pages/login/validate';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Image from 'next/image';

type LoginFormValues = {
  email: string;
  password: string;
};
const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function Index() {
  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);
    try {
      await axios.post('http://localhost:8080/login', values, { withCredentials: true });
      window.location.href = '/quiz';
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AuthPagesLayout>
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardHeader title="Log in to PrediGrowee" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidate}
              onSubmit={handleSubmit}
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
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#a5b4fc', '&:hover': { bgcolor: '#8c9eff' } }}
                  >
                    Login
                  </LoadingButton>
                </Form>
              )}
            </Formik>
            <Typography align="center" variant="body2">
              OR
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Image src="" alt="Google" width={20} height={20} />}
              sx={{ mt: 2, mb: 2 }}
            >
              Log in with Google
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/register" variant="body2">
                Register
              </Link>
              <br />
              <Link href="/" variant="body2">
                Confirm account
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </AuthPagesLayout>
  );
}
