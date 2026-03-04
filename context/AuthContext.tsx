"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

export type UserRole = "admin" | "moderator" | "user";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  loginWithToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserFromToken = (token: string): User | null => {
    try {
      const payload = jwtDecode<User & { exp: number }>(token);
      const currentTime = Date.now() / 1000;
      // console.log(payload.exp,"Current date =>",currentTime)
      if (payload.exp < currentTime) {
        localStorage.removeItem("token");
        return null;
      }
      return { id: payload.id, name: payload.name, role: payload.role };
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = getUserFromToken(token);
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const loginWithToken = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = getUserFromToken(token);
    setUser(decoded);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, loginWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
