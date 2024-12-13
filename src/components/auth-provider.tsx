"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface User {
  id: string;
  username: string;
  role: "designer" | "player";
  points?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    role: "designer" | "player"
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      loadUserProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserProfile = async (authToken: string) => {
    try {
      const userData = await apiClient.getUserProfile(authToken);
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const { token: authToken } = await apiClient.login(username, password);
    localStorage.setItem("token", authToken);
    await loadUserProfile(authToken);
  };

  const register = async (
    username: string,
    password: string,
    role: "designer" | "player"
  ) => {
    await apiClient.register(username, password, role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
