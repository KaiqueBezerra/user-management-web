import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string | null;
  deactivated: boolean;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
