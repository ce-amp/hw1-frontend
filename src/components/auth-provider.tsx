"use client";

import React, { createContext, useState, useContext } from "react";

interface User {
  id: number;
  username: string;
  type: "designer" | "player";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration purposes, we'll set a user based on the username
    const newUser: User = {
      id: 1,
      username,
      type: username.startsWith("designer") ? "designer" : "player",
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
