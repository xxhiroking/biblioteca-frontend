import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiBook, FiLogOut, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../hooks/useDarkMode';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiBook className="logo-icon" />
          <span>Mi Biblioteca</span>
        </Link>

        {isAuthenticated && (
          <div className="navbar-menu">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/libros" className="nav-link">
              Mis Libros
            </Link>

            <div className="navbar-user">
              <span className="user-name">
                <FiUser className="user-icon" />
                {user?.nombre}
              </span>
              <button onClick={toggle} className="btn-theme-toggle" title={isDark ? 'Modo claro' : 'Modo oscuro'}>
                {isDark ? <FiSun /> : <FiMoon />}
              </button>
              <button onClick={handleLogout} className="btn-logout">
                <FiLogOut />
                Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
