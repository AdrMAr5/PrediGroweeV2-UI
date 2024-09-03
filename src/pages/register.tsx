import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  CardHeader,
} from '@mui/material';
import AuthPagesLayout from '../components/layouts/AuthPagesLayout';
import UsersClient from '@/apiClients/UsersClient';

export default function Register() {
  const usersClient = new UsersClient('http://127.0.0.1:8080');

  return (
    <AuthPagesLayout>
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardHeader title="Register to PrediGrowee" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={(event) => {
              event.preventDefault();
              // const email = event.target.email.value;
              // const password = event.target.password.value;
              // const retypePassword = event.target.retypePassword.value;
              // console.log(email, password, retypePassword);
              // usersClient
              //   .register(email, password)
              //   .then((response) => {
              //     console.log(response);
              //   })
              //   .catch((error) => {
              //     console.error(error);
              //   });
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="retypePassword"
              label="Retype password"
              type="password"
              id="retypePassword"
            />
            <FormControlLabel
              control={<Checkbox value="notRobot" color="primary" />}
              label="Nie jestem robotem"
            />
            {/* Add reCAPTCHA component here */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#a5b4fc',
                '&:hover': { bgcolor: '#8c9eff' },
              }}
            >
              Register
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Login
              </Link>
              <br />
              <Link href="/confirm-account" variant="body2">
                Confirm account
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </AuthPagesLayout>
  );
}
