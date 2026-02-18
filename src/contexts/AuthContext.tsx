import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthResponse, LoginData, RegisterData } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: AuthResponse | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al montar
  useEffect(() => {
    const loadUser = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (data: LoginData) => {
    const response = await authService.login(data);
    authService.saveAuthData(response);
    setUser(response);
  };

  const register = async (data: RegisterData) => {
    const response = await authService.register(data);
    authService.saveAuthData(response);
    setUser(response);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
