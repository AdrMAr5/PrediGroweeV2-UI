import React from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AdminClient from '@/Clients/AdminClient';
import { ADMIN_SERVICE_URL } from '@/Envs';
import { UserData, UserDetails, UserRole } from '@/types';
import TopNavBar from '@/components/ui/TopNavBar/TopNavBar';
import UserDetailsModal from './_components/UserDetailsModal';
import Link from 'next/link';

const AdminUsersPanel = () => {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [selectedUserDetails, setSelectedUserDetails] = React.useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const adminClient = React.useMemo(() => new AdminClient(ADMIN_SERVICE_URL), []);

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await adminClient.getAllUsers();
        setUsers(data);
      } catch {
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleViewDetails = async (userId: string) => {
    try {
      const details = await adminClient.getUserDetails(userId);
      setSelectedUserDetails(details);
    } catch {
      setError('Failed to load user details');
    }
  };

  const handleRoleUpdate = async (userId: number, newRole: UserRole) => {
    try {
      await adminClient.updateUser(userId.toString(), { role: newRole });
      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
      if (selectedUserDetails) {
        setSelectedUserDetails({
          ...selectedUserDetails,
          user: { ...selectedUserDetails.user, role: newRole },
        });
      }
    } catch {
      throw new Error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminClient.deleteUser(userId);
      setUsers(users.filter((user) => user.id.toString() !== userId));
    } catch {
      setError('Failed to delete user');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <TopNavBar />
      <Box py={3} maxWidth="lg" mx="auto" px={{ md: 2, xs: 1 }}>
        <Typography variant="h4" gutterBottom>
          <IconButton LinkComponent={Link} href="/admin" sx={{ mr: 2 }}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          Users Management
        </Typography>

        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={user.role === 'admin' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(user.id.toString())}>
                        <InfoIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user.id.toString())}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <UserDetailsModal
          open={!!selectedUserDetails}
          onClose={() => setSelectedUserDetails(null)}
          userDetails={selectedUserDetails}
          onRoleChange={handleRoleUpdate}
        />
      </Box>
    </Box>
  );
};

export default AdminUsersPanel;
