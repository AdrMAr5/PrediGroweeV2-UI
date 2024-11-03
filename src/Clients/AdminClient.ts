import BaseClient from '@/Clients/BaseClient';
import { UserData } from '@/types';

class AdminClient extends BaseClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAllUsers() {
    try {
      const res = await this.axiosInstance.get('/auth/users');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch users: " + err);
    }
  }

  async updateUser(userId: string, updatedData: UserData) {
    try {
      const res = await this.axiosInstance.put(`/auth/users/${userId}`, updatedData);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't update user: " + err);
    }
  }

  async deleteUser(userId: string) {
    try {
      const res = await this.axiosInstance.delete(`/auth/users/${userId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't delete user: " + err);
    }
  }

  async getAllRoles() {
    try {
      const res = await this.axiosInstance.get('/auth/roles');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch roles: " + err);
    }
  }

  async createRole(roleData: { userId: string; role: string }) {
    try {
      const res = await this.axiosInstance.post('/auth/roles', roleData);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't create role: " + err);
    }
  }

  async updateRole(roleId: string, updatedData: { role: string }) {
    try {
      const res = await this.axiosInstance.put(`/auth/roles/${roleId}`, updatedData);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't update role: " + err);
    }
  }

  async deleteRole(roleId: string) {
    try {
      const res = await this.axiosInstance.delete(`/auth/roles/${roleId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't delete role: " + err);
    }
  }
}

export default AdminClient;
