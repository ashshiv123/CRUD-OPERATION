import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { apiRequest } from '@/lib/api';
import { useFlash } from '@/providers/flash-context';
import { UserSummary } from '@/types/domain';

type Credentials = {
  username: string;
  password: string;
};

type SignupPayload = Credentials & {
  email: string;
};

type AuthContextValue = {
  user: UserSummary | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  login: (payload: Credentials) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { showFlash } = useFlash();
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await apiRequest<{ user: UserSummary | null }>('/api/auth/me');
      setUser(data.user || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      refreshUser,
      login: async (payload) => {
        const data = await apiRequest<{ user: UserSummary }>('/api/auth/login', {
          method: 'POST',
          body: payload,
        });
        setUser(data.user);
        showFlash({ type: 'success', message: `Welcome back, ${data.user.username}.` });
      },
      signup: async (payload) => {
        const data = await apiRequest<{ user: UserSummary }>('/api/auth/signup', {
          method: 'POST',
          body: payload,
        });
        setUser(data.user);
        showFlash({ type: 'success', message: `Account created for ${data.user.username}.` });
      },
      logout: async () => {
        await apiRequest('/api/auth/logout', { method: 'POST' });
        setUser(null);
        showFlash({ type: 'success', message: 'Logged out successfully.' });
      },
    }),
    [loading, showFlash, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
