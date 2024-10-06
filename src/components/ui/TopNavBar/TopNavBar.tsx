import { AppBar, Box, Button, IconButton, Toolbar, useTheme } from '@mui/material';
import PrediGroweeIcon from '@/static/icons/PrediGroweeIcon';
import React from 'react';
import { useAuthContext } from '@/components/contexts/AuthContext';

export default function TopNavBar() {
  const theme = useTheme();
  return (
    <AppBar position="static" color="transparent" elevation={5}>
      <Toolbar>
        <Link href="/">
          <IconButton>
            <PrediGroweeIcon width="36px" />
          </IconButton>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/about">
          <Button color="inherit">About</Button>
        </Link>
        <Link href="/login">
          <Button color="inherit">Get Started</Button>
        </Link>
        <Link href="/contact">
          <Button color="inherit">Contact</Button>
        </Link>
        <Link href="privacy">
          <Button color="inherit">Privacy</Button>
        </Link>
        {isAdmin && (
          <Link href="/admin">
            <Button color="inherit">Admin Panel</Button>
          </Link>
        )}
        <Button
          color="inherit"
          onClick={handleClick}
          aria-controls="account-menu"
          aria-haspopup="true"
        >
          Account
        </Button>
      </Toolbar>
    </AppBar>
  );
}
