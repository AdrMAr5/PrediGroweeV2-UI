import React from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import UserStatsSection from '@/pages/admin/users/_components/UserStatsSection';
import { UserDetails, UserRole } from '@/types';

const UserDetailsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  userDetails: UserDetails | null;
  onRoleChange: (id: number, role: UserRole) => Promise<void>;
}> = ({ open, onClose, userDetails, onRoleChange }) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!userDetails) return null;

  const handleRoleChange = async (newRole: UserRole) => {
    setIsUpdating(true);
    setError(null);
    try {
      await onRoleChange(userDetails.user.id, newRole);
    } catch {
      setError('Failed to update user role');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>
              Name: {userDetails.user.firstName} {userDetails.user.lastName}
            </Typography>
            <Typography>Email: {userDetails.user.email}</Typography>
            <Typography>
              Created: {new Date(userDetails.user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <UserStatsSection stats={userDetails.stats} />
          <Box>
            <Typography variant="h6">Role Management</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={userDetails.user.role}
                label="Role"
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                disabled={isUpdating}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserDetailsModal;
