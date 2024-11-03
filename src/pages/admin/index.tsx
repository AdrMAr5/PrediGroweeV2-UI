import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import { Box, Card, CardHeader, Grid2, Stack, Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <Box>
      <TopNavBar />
      <Stack
        component="main"
        spacing={4}
        sx={{
          maxWidth: '1000px',
          width: '100%',
          marginX: 'auto',
          marginTop: 4,
          padding: 2,
        }}
      >
        <Typography variant="h3">Admin Page</Typography>
        <Grid2 columns={12} container spacing={4} flexDirection="row" flexWrap="wrap">
          <Grid2 size={8}>
            <Card sx={{ height: '500px' }}>
              <CardHeader title="tu bedzie wykres" />
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Stack direction="column" justifyContent="space-between" spacing={4} flexGrow={1}>
              <Card sx={{ flexGrow: 1 }}>
                <CardHeader title="tu bedzie lista użytkowników" />
              </Card>

              <Card sx={{ flexGrow: 1 }}>
                <CardHeader title="tu bedzie cośtam innego" />
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <CardHeader title="tu bedzie cośtam jeszcze innego" />
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <CardHeader title="tu bedzie cośtam jeszcze innego" />
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <CardHeader title="tu bedzie cośtam jeszcze innego" />
            </Card>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};

export default AdminPage;
