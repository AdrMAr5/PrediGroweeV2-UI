import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { Security, Email, Google, Storage, Gavel } from '@mui/icons-material';

export default function Privacy() {
  const sections = [
    {
      title: 'Data Collection and Usage',
      icon: <Storage />,
      content: [
        'Personal data (name, email) for account management',
        'Professional information provided in surveys',
        'Quiz responses and performance metrics',
        'Device information and session data',
      ],
    },
    {
      title: 'Data Storage and Protection',
      icon: <Security />,
      content: [
        'Secure servers located in the European Union',
        'Industry-standard encryption for data transmission',
        'Limited access to authorized administrators only',
        'Securely hashed passwords',
      ],
    },
    {
      title: 'Google Authentication',
      icon: <Google />,
      content: [
        'We receive your Google account email and name',
        'We do not receive or store your Google password',
        'We do not post to your Google account',
      ],
    },
    {
      title: 'Data Usage',
      icon: <Storage />,
      content: [
        'Account authentication and management',
        'Research purposes in orthodontics (anonymized)',
        'Improving educational effectiveness',
        'Generating aggregated statistics',
      ],
    },
    {
      title: 'Data Rights',
      icon: <Gavel />,
      content: [
        'Access your personal data',
        'Request data correction or deletion',
        'Export your data in CSV format',
        'Withdraw consent for data collection',
      ],
    },
    {
      title: 'Contact & Updates',
      icon: <Email />,
      content: [
        'For privacy inquiries contact: predigrowee2.0@gmail.com',
        'Policy updates will be notified to users',
        'Last updated: December 2024',
      ],
    },
  ];

  return (
    <>
      <TopNavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          Privacy Policy
        </Typography>

        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    {section.icon}
                    <Typography variant="h6" component="h2">
                      {section.title}
                    </Typography>
                  </Box>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {section.content.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
