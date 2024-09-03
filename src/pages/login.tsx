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
import AuthPagesLayout from '../components/layouts/AuthPagesLayout';

export default function Login() {
  return (
    <AuthPagesLayout>
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardHeader title="Log in to PrediGrowee" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#a5b4fc', '&:hover': { bgcolor: '#8c9eff' } }}
            >
              Login
            </Button>
            <Typography align="center" variant="body2">
              OR
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img src="/google-icon.png" alt="Google" width={20} height={20} />}
              sx={{ mt: 2, mb: 2 }}
            >
              Log in with Google
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/register" variant="body2">
                Register
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
