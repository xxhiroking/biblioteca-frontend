import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="home-page">
        <div className="welcome-section">
          <h1>¡Bienvenido, {user?.nombre}! 📚</h1>
          <p className="subtitle">Organiza tu colección de libros de forma fácil y rápida</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Gestiona tus libros</h3>
            <p>Agrega, edita y elimina libros de tu colección personal</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Busca fácilmente</h3>
            <p>Encuentra libros por título, autor o género</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Control de disponibilidad</h3>
            <p>Marca libros como disponibles o prestados</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Información detallada</h3>
            <p>Guarda ISBN, año de publicación y más</p>
          </div>
        </div>

        <div className="cta-section">
          <a href="/libros" className="btn-primary-large">
            Ver mis libros
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
