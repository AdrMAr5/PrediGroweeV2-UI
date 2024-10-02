import React from 'react';
import AuthClient from '@/Clients/AuthClient';
import { AUTH_SERVICE_URL } from '@/Envs';

type Role = 'admin' | 'user';

type UserData = {
  email: string | null;
  role: Role | null;
};

export type AuthContextType = {
  userData: UserData;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthContextType>({
  userData: { email: null, role: null },
  register: () => {},
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authClient = new AuthClient(AUTH_SERVICE_URL);
  const [userData, setUserData] = React.useState<UserData>({
    email: null,
    role: null,
  });
  const register = async (email: string, password: string) => {
    try {
      const data = await authClient.register(email, password);
      if (data.access_token && data.role) {
        setUserData({ email: email, role: data.role });
      }
    } catch (error) {
      alert(error);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const data = await authClient.login(email, password);
      if (data.access_token && data.role) {
        setUserData({ email: email, role: data.role });
      }
    } catch (error) {
      alert(error);
    }
  };
  const logout = async () => {
    await authClient.logout();
    setUserData({ email: null, role: null });
  };
  return (
    <AuthContext.Provider
      value={{ userData: userData, register: register, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
