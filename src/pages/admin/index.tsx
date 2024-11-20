import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <Box>
      <TopNavBar />
      <Stack
        component="main"
        spacing={4}
        sx={{
          maxWidth: 'lg',
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
                <CardHeader title="Users" />
                <CardContent>
                  <Typography>
                    Registered users: <strong>100</strong>
                  </Typography>
                  <Typography>
                    Active users: <strong>50</strong>
                  </Typography>
                  <Typography>
                    Last 24h registrations: <strong>5</strong>
                  </Typography>
                  <Button
                    LinkComponent={Link}
                    href="/admin/users"
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Show all users
                  </Button>
                </CardContent>
              </Card>

              <Card sx={{ flexGrow: 1 }}>
                <CardHeader title="Statistics" />
                <CardContent>
                  <Typography>
                    Quiz sessions: <strong>100</strong>
                  </Typography>
                  <Typography>
                    Questions answered: <strong>500</strong>
                  </Typography>
                  <Typography>
                    Correct answers: <strong>1000</strong>
                  </Typography>
                  <Button
                    LinkComponent={Link}
                    href="/admin/stats"
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Show statistics
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Card sx={{ height: 'auto' }}>
              <CardHeader title="Questions" />
              <CardContent>
                <Typography>
                  Questions in database: <strong>100</strong>
                </Typography>
                <Button
                  LinkComponent={Link}
                  href="/admin/questions"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Show all questions
                </Button>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <CardHeader title="Surveys" />
              <CardContent>
                <Typography>
                  Active surveys: <strong>2</strong>
                </Typography>
                <Button
                  LinkComponent={Link}
                  href="/admin/surveys"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Show all surveys
                </Button>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <CardHeader title="Site contents" />
              <CardContent>
                <Typography>Manage Contact, Privacy, About Pages</Typography>
                <Button
                  LinkComponent={Link}
                  href="/admin/site-contents"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};

export default AdminPage;
