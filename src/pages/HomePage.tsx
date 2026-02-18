import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h1>Bienvenido, {user?.nombre}!</h1>
      <p>Esta es tu página de inicio.</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomePage;
