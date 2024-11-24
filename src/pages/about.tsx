import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import React from 'react';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import { Parameter } from '@/types';

export default function About() {
  const [parameters, setParameters] = React.useState<Parameter[]>([]);
  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadParameters = async () => {
      try {
        const data = await adminClient.getAllParameters();
        setParameters(data);
      } catch (error) {
        console.error('Failed to load parameters:', error);
      }
    };
    loadParameters();
  }, [adminClient]);

  return (
    <>
      <TopNavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Predigrowee
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
          Cephalometric Parameters
        </Typography>

        <Grid container spacing={3}>
          {parameters.map((param) => (
            <Grid item xs={12} sm={6} md={4} key={param.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${ADMIN_SERVICE_URL}/parameters/${param.id}/image`}
                  alt={param.name}
                  sx={{ objectFit: 'contain', p: 2, bgcolor: 'grey.50' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {param.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {param.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Reference Value: {param.referenceValues}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
