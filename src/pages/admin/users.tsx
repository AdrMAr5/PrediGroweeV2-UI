import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminClient from '@/Clients/AdminClient';
import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import { UserData } from '@/types';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adminClient = new AdminClient('http://localhost'); // Replace with your API base URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await adminClient.getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminClient.deleteUser(userId);
      setUsers(users.filter((user: UserData) => user.id.toString() !== userId)); // Remove user from the list
    } catch (err) {
      console.error(err);
      setError('Failed to delete user');
    }
  };

  return (
    <Box>
      <TopNavBar />
      <Box
        component="main"
        sx={{
          maxWidth: '1000px',
          marginX: 'auto',
          marginTop: 4,
          padding: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          User Management
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Card>
            <CardHeader title="Users List" />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user: UserData) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => console.log(`Edit user ${user.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => handleDeleteUser(user.id.toString())}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AdminUsersPage;
