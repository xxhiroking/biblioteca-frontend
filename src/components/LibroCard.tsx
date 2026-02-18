import { Libro } from '../types';
import { FiEdit, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';
import './LibroCard.css';

interface LibroCardProps {
  libro: Libro;
  onEdit: (libro: Libro) => void;
  onDelete: (id: number) => void;
  onToggleDisponibilidad: (id: number) => void;
}

const LibroCard = ({
  libro,
  onEdit,
  onDelete,
  onToggleDisponibilidad,
}: LibroCardProps) => {
  return (
    <div className={`libro-card ${!libro.disponible ? 'libro-prestado' : ''}`}>
      <div className="libro-card-header">
        <h3>{libro.titulo}</h3>
        <span
          className={`disponibilidad-badge ${libro.disponible ? 'disponible' : 'prestado'}`}
          onClick={() => onToggleDisponibilidad(libro.id!)}
          title="Click para cambiar disponibilidad"
        >
          {libro.disponible ? (
            <>
              <FiCheckCircle /> Disponible
            </>
          ) : (
            <>
              <FiCircle /> Prestado
            </>
          )}
        </span>
      </div>

      <div className="libro-card-body">
        <p className="libro-autor">
          <strong>Autor:</strong> {libro.autor}
        </p>

        {libro.isbn && (
          <p className="libro-isbn">
            <strong>ISBN:</strong> {libro.isbn}
          </p>
        )}

        {libro.anioPublicacion && (
          <p className="libro-anio">
            <strong>Año:</strong> {libro.anioPublicacion}
          </p>
        )}

        {libro.genero && (
          <p className="libro-genero">
            <span className="genero-tag">{libro.genero}</span>
          </p>
        )}

        {libro.descripcion && (
          <p className="libro-descripcion">{libro.descripcion}</p>
        )}
      </div>

      <div className="libro-card-actions">
        <button
          className="btn-icon btn-icon-edit"
          onClick={() => onEdit(libro)}
          title="Editar"
        >
          <FiEdit />
        </button>
        <button
          className="btn-icon btn-icon-delete"
          onClick={() => onDelete(libro.id!)}
          title="Eliminar"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default LibroCard;
