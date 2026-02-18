import { ReactNode } from 'react';
import Navbar from './Navbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2026 Mi Biblioteca. Creado con React + Spring Boot</p>
      </footer>
    </div>
  );
};

export default Layout;
