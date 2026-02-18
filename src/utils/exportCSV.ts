import { Libro } from '../types';

export const exportLibrosToCSV = (libros: Libro[]) => {
  const headers = ['Título', 'Autor', 'ISBN', 'Año', 'Género', 'Disponible'];

  const rows = libros.map((libro) => [
    libro.titulo,
    libro.autor,
    libro.isbn || '',
    libro.anioPublicacion?.toString() || '',
    libro.genero || '',
    libro.disponible ? 'Sí' : 'No',
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers, ...rows].map((row) => row.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `mis-libros-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
