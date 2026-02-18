// Tipos para Usuario
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Tipos para Libro
export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  isbn?: string;
  anioPublicacion?: number;
  genero?: string;
  descripcion?: string;
  disponible?: boolean;
  usuarioId?: number;
  usuarioNombre?: string;
}

// Tipos para Autenticación
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  nombre: string;
  usuarioId: number;
}

// Tipo para errores
export interface ErrorResponse {
  status: number;
  mensaje: string;
  errores?: { [key: string]: string };
  timestamp: string;
}
