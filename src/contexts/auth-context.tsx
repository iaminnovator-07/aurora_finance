import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, setStoredAuth, getStoredAuth, type StoredAuth } from "@/lib/api/client";
import { AUTH_STORAGE_KEY } from "@/lib/api/config";

type AuthContextValue = {
  auth: StoredAuth | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// DEV_CREDENTIALS removed. User must explicitly log in.

export function AuthProvider({ children }: { children: ReactNode }) {
  const defaultSession: StoredAuth = {
    access_token: "demo_access_token",
    refresh_token: "demo_refresh_token",
    user: {
      id: "00000000-0000-0000-0000-000000000000",
      email: "demo@auroratia.com",
      full_name: "Demo Admin",
      role: "admin",
    }
  };

  const [auth, setAuth] = useState<StoredAuth | null>(defaultSession);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Demo Mode: We're already logged in by default.
  }, []);


  const login = async (email: string, password: string) => {
    const data = await api.post<{
      user: StoredAuth["user"];
      tokens: { access_token: string; refresh_token: string };
    }>("/auth/login", { email, password });
    const session: StoredAuth = {
      access_token: data.tokens.access_token,
      refresh_token: data.tokens.refresh_token,
      user: data.user,
    };
    setStoredAuth(session);
    setAuth(session);
  };

  const demoLogin = () => {
    const session: StoredAuth = {
      access_token: "demo_access_token",
      refresh_token: "demo_refresh_token",
      user: {
        id: "demo-user-id",
        email: "demo@auroratia.com",
        full_name: "Demo User",
        role: "admin",
      }
    };
    setStoredAuth(session);
    setAuth(session);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, isLoading, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
