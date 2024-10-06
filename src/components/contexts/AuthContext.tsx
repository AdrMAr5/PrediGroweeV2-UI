import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import AuthClient from '@/Clients/AuthClient';
import { AUTH_SERVICE_URL } from '@/Envs';

type Role = 'admin' | 'user';
type UserRoutes = 'startQuiz' | 'quiz/[sessionId]' | 'quiz/[sessionId]/results' | '/account';
type AdminRoutes = '/admin';

type UserData = {
  email: string | null;
  role: Role | null;
};

export type AuthContextType = {
  userData: UserData;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    email: null,
    role: null,
  });

  const authClient = useMemo(() => new AuthClient(AUTH_SERVICE_URL), []);

  const register = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await authClient.register(email, password);
        if (data.access_token && data.role) {
          setUserData({ email: email, role: data.role });
        }
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    [authClient]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await authClient.login(email, password);
        if (data.access_token) {
          setUserData({ email: email, role: data.role });
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    [authClient]
  );

  const logout = useCallback(async () => {
    try {
      await authClient.logout();
      setUserData({ email: null, role: null });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, [authClient]);

  const value = useMemo(
    () => ({
      userData,
      register,
      login,
      logout,
    }),
    [userData, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};
