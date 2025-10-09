import { useState, useEffect, type ReactNode, useCallback } from "react";
import { AuthContext, type User } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const isAuthenticated = !!token;

  const validateToken = useCallback(async (token: string) => {
    try {
      const response = await fetch("http://localhost:3333/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.valid) {
        logout();
      }

      setUser(result.user);
    } catch (err) {
      console.error("Token validation failed:", err);
      logout();
    }
  }, []);

  function login(newToken: string) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token, validateToken]); //

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
