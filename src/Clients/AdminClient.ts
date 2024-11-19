import BaseClient from '@/Clients/BaseClient';
import { Parameter, UserData } from '@/types';

class AdminClient extends BaseClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAllUsers() {
    try {
      const res = await this.axiosInstance.get('/users');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch users: " + err);
    }
  }

  async getUserDetails(id: string) {
    try {
      const res = await this.axiosInstance.get('/users/' + id);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch user details: " + err);
    }
  }

  async updateUser(userId: string, updatedData: Partial<UserData>) {
    try {
      const res = await this.axiosInstance.patch(`/users/${userId}`, updatedData);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't update user: " + err);
    }
  }

  async getAllQuestions() {
    try {
      const res = await this.axiosInstance.get('/questions');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch questions: " + err);
    }
  }

  async getAllParameters() {
    try {
      const res = await this.axiosInstance.get('/parameters');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch parameters: " + err);
    }
  }

  async updateParameter(parameterId: string, updatedParam: Parameter) {
    try {
      const res = await this.axiosInstance.patch(`/parameters/${parameterId}`, updatedParam);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't update parameter: " + err);
    }
  }

  async getAllOptions() {
    try {
      const res = await this.axiosInstance.get('/options');
      return res.data;
    } catch (err) {
      throw new Error("Couldn't fetch options: " + err);
    }
  }

  async deleteUser(userId: string) {
    try {
      const res = await this.axiosInstance.delete(`/users/${userId}`);
      return res.data;
    } catch (err) {
      throw new Error("Couldn't delete user: " + err);
    }
  }

  async getAllRoles() {
    try {
      const res = await this.axiosInstance.get('/roles');
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
