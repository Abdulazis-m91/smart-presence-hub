import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "guru" | "petugas" | "admin" | "developer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const mockUsers: Record<string, User & { password: string }> = {
  "guru@school.id": { id: "1", name: "Ahmad Fauzi", email: "guru@school.id", role: "guru", password: "123456" },
  "petugas@school.id": { id: "2", name: "Siti Aminah", email: "petugas@school.id", role: "petugas", password: "123456" },
  "admin@school.id": { id: "3", name: "Hasan Basri", email: "admin@school.id", role: "admin", password: "123456" },
  "dev@school.id": { id: "4", name: "Developer", email: "dev@school.id", role: "developer", password: "123456" },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = mockUsers[email];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
