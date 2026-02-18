import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Registro</h1>
      <p>Formulario de registro (próximo archivo)</p>
      <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
    </div>
  );
};

export default RegisterPage;
