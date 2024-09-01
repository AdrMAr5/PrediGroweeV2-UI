import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Box, IconButton} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import PrediGroweeIcon from "@/static/icons/PrediGroweeIcon";
import "@/static/img/predigrowee-start-page.png";
import TopNavBar from "@/components/TopNavBar/TopNavBar";

export default function Home() {
    return (
        <>
            <Head>
                <title>Predigrowee</title>
                <meta name="description" content="Predict the direction of facial growth" />
                <link rel="icon" href="" />
            </Head>

            <Box
                sx={{
                    backgroundImage: `url("@/static/img/predigrowee-start-page.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                }}
            >
                <TopNavBar/>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: '80vh',
                            textAlign: 'left',
                            paddingLeft: '5%',
                        }}
                    >
                        <Typography variant="h2" component="h1" gutterBottom>
                            Predigrowee
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Can you predict the direction of the facial growth?
                        </Typography>
                        <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
                            TRY IT!
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
}