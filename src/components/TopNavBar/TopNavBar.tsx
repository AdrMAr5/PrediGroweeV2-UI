import {AppBar, Box, Button, IconButton, Toolbar, useTheme} from "@mui/material";
import PrediGroweeIcon from "@/static/icons/PrediGroweeIcon";
import React from "react";

export default function TopNavBar(){
    const theme = useTheme();
    return (
        <AppBar position="static" color={theme.palette.grey.A100} elevation={0}>
            <Toolbar>
                <IconButton href="/">
                    <PrediGroweeIcon width="36px"/>
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Button href="/about" color="inherit" >About</Button>
                <Button href="/login" color="inherit">Get Started</Button>
                <Button href="/contact" color="inherit">Contact</Button>
                <Button href="/privacy" color="inherit">Privacy</Button>
                <Button href="/account" color="inherit">Account</Button>
            </Toolbar>
        </AppBar>

    )
}