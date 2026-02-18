import { FiBook, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Libro } from '../types';
import './LibrosStats.css';

interface LibrosStatsProps {
  libros: Libro[];
}

const LibrosStats: React.FC<LibrosStatsProps> = ({ libros }) => {
  const totalLibros = libros.length;
  const disponibles = libros.filter((l) => l.disponible).length;
  const prestados = totalLibros - disponibles;

  const stats = [
    {
      icon: <FiBook />,
      label: 'Total de Libros',
      value: totalLibros,
      color: 'primary',
    },
    {
      icon: <FiCheckCircle />,
      label: 'Disponibles',
      value: disponibles,
      color: 'success',
    },
    {
      icon: <FiCircle />,
      label: 'Prestados',
      value: prestados,
      color: 'warning',
    },
  ];

  return (
    <div className="libros-stats">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibrosStats;
