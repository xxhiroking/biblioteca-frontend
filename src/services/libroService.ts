import api from './api';
import { Libro } from '../types';

export const libroService = {
  // Obtener todos los libros
  getAll: async (): Promise<Libro[]> => {
    const response = await api.get<Libro[]>('/libros');
    return response.data;
  },

  // Obtener libro por ID
  getById: async (id: number): Promise<Libro> => {
    const response = await api.get<Libro>(`/libros/${id}`);
    return response.data;
  },

  // Obtener mis libros
  getMisLibros: async (): Promise<Libro[]> => {
    const response = await api.get<Libro[]>('/libros/mis-libros');
    return response.data;
  },

  // Crear libro
  create: async (libro: Libro): Promise<Libro> => {
    const response = await api.post<Libro>('/libros', libro);
    return response.data;
  },

  // Actualizar libro
  update: async (id: number, libro: Libro): Promise<Libro> => {
    const response = await api.put<Libro>(`/libros/${id}`, libro);
    return response.data;
  },

  // Eliminar libro
  delete: async (id: number): Promise<void> => {
    await api.delete(`/libros/${id}`);
  },

  // Buscar libros
  search: async (query: string): Promise<Libro[]> => {
    const response = await api.get<Libro[]>(`/libros/buscar?q=${query}`);
    return response.data;
  },

  // Cambiar disponibilidad
  toggleDisponibilidad: async (id: number): Promise<Libro> => {
    const response = await api.patch<Libro>(`/libros/${id}/disponibilidad`);
    return response.data;
  },
};
