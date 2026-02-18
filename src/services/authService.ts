import api from './api';
import { LoginData, RegisterData, AuthResponse } from '../types';

export const authService = {
  // Registrar usuario
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  // Obtener token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Verificar si está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Obtener usuario actual
  getCurrentUser: (): AuthResponse | null => {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  },

  // Guardar datos de autenticación
  saveAuthData: (data: AuthResponse) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data));
  },
};
