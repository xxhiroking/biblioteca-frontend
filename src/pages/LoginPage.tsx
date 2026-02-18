import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Login</h1>
      <p>Formulario de login (próximo archivo)</p>
      <Link to="/register">¿No tienes cuenta? Regístrate</Link>
    </div>
  );
};

export default LoginPage;
