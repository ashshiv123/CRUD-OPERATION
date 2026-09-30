/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { apiRequest } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children, onFlash }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    apiRequest("/api/auth/me")
      .then((data) => {
        if (alive) {
          setUser(data?.user || null);
        }
      })
      .catch(() => {
        if (alive) {
          setUser(null);
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const login = useCallback(async (payload) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: payload,
    });
    setUser(data.user);
    onFlash?.({ type: "success", message: "You have logged in successfully!" });
    return data.user;
  }, [onFlash]);

  const signup = useCallback(async (payload) => {
    const data = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: payload,
    });
    setUser(data.user);
    onFlash?.({ type: "success", message: "You have signed up successfully!" });
    return data.user;
  }, [onFlash]);

  const logout = useCallback(async () => {
    await apiRequest("/api/auth/logout", { method: "POST" });
    setUser(null);
    onFlash?.({ type: "success", message: "You have logged out successfully!" });
  }, [onFlash]);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
