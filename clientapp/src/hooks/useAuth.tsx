import { createContext, useContext, useMemo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import type { UserLoginApiReturn } from "../types";
import { loginUser } from "../services/UserService";

interface DecodedToken {
  role?: string; // Pole do przechowywania roli
  exp?: number; // Czas wygaśnięcia tokena
}

interface AuthContextType {
  token: string | null;
  role: string | null; // Dodano pole dla roli
  login: (
    { username, password }: { username: string; password: string },
    path?: string
  ) => Promise<UserLoginApiReturn>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [role, setRole] = useState<string | null>(null); // Stan dla roli użytkownika
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded.role || null); // Ustaw rolę na podstawie tokena
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const login = async (
    { username, password }: { username: string; password: string },
    path: string = "/"
  ): Promise<UserLoginApiReturn> => {
    try {
      const { token, error } = await loginUser(username, password);

      if (token !== null) {
        setToken(token);

        try {
          const decoded: DecodedToken = jwtDecode(token);
          setRole(decoded.role || null); // Dekoduj token, aby ustawić rolę
        } catch (error) {
          console.error("Invalid token:", error);
          setRole(null);
        }

        navigate(path);
        return { token };
      }
      return { token: null, error };
    } catch (error) {
      return { token: null, error } as UserLoginApiReturn;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null); // Reset roli
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      role, // Dodano rolę do kontekstu
      login,
      logout,
    }),
    [token, role] // Dodano zależność role
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
