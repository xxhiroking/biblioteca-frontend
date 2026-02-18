import { useState, useEffect } from 'react';
import { Libro } from '../types';
import Button from './Button';
import { FiX } from 'react-icons/fi';
import './LibroForm.css';

interface LibroFormProps {
  libro: Libro | null;
  onSubmit: (libro: Libro) => void;
  onCancel: () => void;
}

const LibroForm = ({ libro, onSubmit, onCancel }: LibroFormProps) => {
  const [formData, setFormData] = useState<Libro>({
    titulo: '',
    autor: '',
    isbn: '',
    anioPublicacion: undefined,
    genero: '',
    descripcion: '',
    disponible: true,
  });

  useEffect(() => {
    if (libro) {
      setFormData(libro);
    }
  }, [libro]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      disponible: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{libro ? 'Editar Libro' : 'Nuevo Libro'}</h2>
          <button className="btn-close-modal" onClick={onCancel}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="libro-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="titulo">Título *</label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Cien Años de Soledad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="autor">Autor *</label>
              <input
                id="autor"
                name="autor"
                type="text"
                value={formData.autor}
                onChange={handleChange}
                required
                placeholder="Gabriel García Márquez"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                value={formData.isbn || ''}
                onChange={handleChange}
                placeholder="978-0307474728"
              />
            </div>

            <div className="form-group">
              <label htmlFor="anioPublicacion">Año de Publicación</label>
              <input
                id="anioPublicacion"
                name="anioPublicacion"
                type="number"
                value={formData.anioPublicacion || ''}
                onChange={handleChange}
                min="1000"
                max="2100"
                placeholder="1967"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="genero">Género</label>
            <input
              id="genero"
              name="genero"
              type="text"
              value={formData.genero || ''}
              onChange={handleChange}
              placeholder="Realismo mágico, Ficción, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Breve descripción del libro..."
            />
          </div>

          <div className="form-group-checkbox">
            <input
              id="disponible"
              name="disponible"
              type="checkbox"
              checked={formData.disponible}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="disponible">Disponible</label>
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {libro ? 'Actualizar' : 'Crear'} Libro
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibroForm;
