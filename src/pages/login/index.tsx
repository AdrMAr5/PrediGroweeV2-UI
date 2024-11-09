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
import AuthPagesLayout from '@/components/layouts/AuthPagesLayout';
import LoginValidate from '@/components/LoginValidate';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@/static/icons/GoogleIcon';

type LoginFormValues = {
  email: string;
  password: string;
};
const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function Index() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuthContext();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);
    try {
      await login(values.email, values.password);
      await router.push('/quiz');
    } catch (error) {
      alert('Login failed');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const firstLogin = await loginWithGoogle(tokenResponse.access_token);
        if (firstLogin) {
          await router.push('/register/survey');
        } else {
          await router.push('/quiz');
        }
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: (error) => console.error('Google Login Error:', error),
  });
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
              onClick={() => handleGoogleLogin()}
              startIcon={<GoogleIcon width="24px" />}
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
