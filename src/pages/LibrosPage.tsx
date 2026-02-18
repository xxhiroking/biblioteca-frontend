import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { libroService } from '../services/libroService';
import { Libro } from '../types';
import LibroCard from '../components/LibroCard';
import LibroForm from '../components/LibroForm';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LibrosStats from '../components/LibrosStats';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { FiPlus, FiSearch } from 'react-icons/fi';
import './LibrosPage.css';

const LibrosPage = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLibro, setEditingLibro] = useState<Libro | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Cargar libros
  const cargarLibros = async () => {
    try {
      const data = await libroService.getMisLibros();
      setLibros(data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al cargar los libros' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // Buscar libros
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      cargarLibros();
      return;
    }

    try {
      const resultados = await libroService.search(searchQuery);
      setLibros(resultados);
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al buscar libros' });
    }
  };

  // Manejar submit del formulario
  const handleFormSubmit = async (libro: Libro) => {
    try {
      if (editingLibro) {
        await libroService.update(editingLibro.id!, libro);
        setAlert({ type: 'success', message: '¡Libro actualizado exitosamente!' });
      } else {
        await libroService.create(libro);
        setAlert({ type: 'success', message: '¡Libro creado exitosamente!' });
      }
      setShowForm(false);
      setEditingLibro(null);
      cargarLibros();
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response?.data?.mensaje || 'Error al guardar el libro'
      });
    }
  };

  // Editar libro
  const handleEdit = (libro: Libro) => {
    setEditingLibro(libro);
    setShowForm(true);
  };

  // Eliminar libro
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este libro?')) return;

    try {
      await libroService.delete(id);
      setAlert({ type: 'success', message: 'Libro eliminado' });
      cargarLibros();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al eliminar el libro' });
    }
  };

  // Cambiar disponibilidad
  const handleToggleDisponibilidad = async (id: number) => {
    try {
      await libroService.toggleDisponibilidad(id);
      cargarLibros();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al cambiar disponibilidad' });
    }
  };

  // Cancelar formulario
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingLibro(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="libros-page">
          <div className="page-header">
            <h1>Mis Libros</h1>
          </div>
          <LoadingSkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="libros-page">
        <div className="page-header">
          <h1>Mis Libros</h1>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Agregar Libro
          </Button>
        </div>

        {libros.length > 0 && <LibrosStats libros={libros} />}

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Buscador */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="secondary" onClick={handleSearch}>
            <FiSearch /> Buscar
          </Button>
          {searchQuery && (
            <Button variant="secondary" onClick={() => { setSearchQuery(''); cargarLibros(); }}>
              Limpiar
            </Button>
          )}
        </div>

        {/* Formulario (modal) */}
        {showForm && (
          <LibroForm
            libro={editingLibro}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        )}

        {/* Lista de libros */}
        {libros.length === 0 ? (
          <div className="empty-state">
            <h2>No hay libros registrados</h2>
            <p>Comienza agregando tu primer libro a la colección</p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <FiPlus /> Agregar Primer Libro
            </Button>
          </div>
        ) : (
          <div className="libros-grid">
            {libros.map((libro) => (
              <LibroCard
                key={libro.id}
                libro={libro}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleDisponibilidad={handleToggleDisponibilidad}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LibrosPage;
