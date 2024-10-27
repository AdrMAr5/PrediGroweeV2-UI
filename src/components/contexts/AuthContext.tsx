import React from 'react';
import AuthClient from '@/Clients/AuthClient';
import { AUTH_SERVICE_URL } from '@/Envs';

type Role = 'admin' | 'user';

type UserData = {
  userId: string | null;
  role: Role | null;
};

export type AuthContextType = {
  userData: UserData;
  isLoggedIn: boolean;
  authClient: AuthClient;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthContextType>({
  userData: { userId: null, role: null },
  isLoggedIn: false,
  authClient: new AuthClient(AUTH_SERVICE_URL),
  register: () => {},
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authClient = new AuthClient(AUTH_SERVICE_URL);
  const [userData, setUserData] = React.useState<UserData>({
    userId: null,
    role: null,
  });

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authClient.checkSession();
        console.log('data', data);
        if (data.userId && data.role) {
          setUserData({ userId: data.userId, role: data.role });
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkSession();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const data = await authClient.register(email, password);
      if (data.accessToken && data.user.role) {
        setUserData({ userId: data.userId, role: data.role });
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      alert(error);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const data = await authClient.login(email, password);
      if (data.accessToken && data.role) {
        setUserData({ userId: data.userId, role: data.role });
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      alert(error);
    }
  };
  const logout = async () => {
    await authClient.logout();
    setUserData({ userId: null, role: null });
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoggedIn: userData.userId !== null && userData.role !== null,
        authClient,
        register,
        login,
        logout,
      }}
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
