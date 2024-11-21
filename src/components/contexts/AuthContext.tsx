import React, { useMemo } from 'react';
import AuthClient from '@/Clients/AuthClient';
import { AUTH_SERVICE_URL } from '@/Envs';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Role = 'admin' | 'user';

type UserData = {
  userId: string | null;
  role: Role | null;
};

export type AuthContextType = {
  userData: UserData;
  isLoggedIn: boolean;
  authClient: AuthClient;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (access_token: string) => Promise<boolean>;
  logout: () => Promise<void>;
};
const AuthContext = React.createContext<AuthContextType>({
  userData: { userId: null, role: null },
  isLoggedIn: false,
  authClient: new AuthClient(AUTH_SERVICE_URL),
  register: () => new Promise(() => {}),
  login: () => new Promise(() => {}),
  loginWithGoogle: () => new Promise(() => false),
  logout: () => new Promise(() => {}),
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authClient = useMemo(() => new AuthClient(AUTH_SERVICE_URL), []);
  const [userData, setUserData] = React.useState<UserData>({
    userId: null,
    role: null,
  });

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authClient.checkSession();
        if (data?.userId && data?.role) {
          setUserData({ userId: data.userId, role: data.role });
        }
      } catch {
        console.log('Failed to check session:');
      }
    };
    checkSession();
  }, [authClient]);

  const register = async (email: string, password: string) => {
    await authClient.register(email, password);
  };
  const login = async (email: string, password: string) => {
    const data = await authClient.login(email, password);
    if (data?.accessToken && data?.role) {
      setUserData({ userId: data.userId, role: data.role });
    } else {
      throw new Error('Failed to login');
    }
  };
  const loginWithGoogle = async (access_token: string) => {
    const data = await authClient.loginWithGoogle(access_token);
    if (data?.accessToken && data?.role) {
      setUserData({ userId: data.userId, role: data.role as Role });
      return !!data?.firstLogin;
    } else {
      throw new Error('Failed to login with Google');
    }
  };
  const logout = async () => {
    await authClient.logout();
    setUserData({ userId: null, role: null });
  };
  return (
    <GoogleOAuthProvider clientId="711820824033-s1vvhg02269re31p02bs3snvk3lsnl3a.apps.googleusercontent.com">
      <AuthContext.Provider
        value={{
          userData,
          isLoggedIn: userData.userId !== null && userData.role !== null,
          authClient,
          register,
          login,
          loginWithGoogle,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
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
