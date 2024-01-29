import { Link } from "react-router-dom";
import React from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Accede al estado de autenticación y función de cierre de sesión desde el contexto

    const handleLogout = () => {
        logout(); //Cierra sesión y elimina el token

        // Redirige al usuario a la página de inicio después de cerrar sesión
        navigate('/');
    };

    return (
        <header className="navbar">
            <Link to="/" className="logo">Recetas Mágicas</Link>
            <nav className="nav-menu">
                {user ? ( // Si el usuario está autenticado cambiara el menú con los links de crear receta, recetario y cerrar sesión
                    <div className="nav-links2">
                        <Link to="/recipe-book" className="recipes-btn">Recetario</Link>
                        <Link to="/create-recipe" className="create-btn">Crear Receta</Link>
                        <Link to={'/login'} onClick={handleLogout} className="logout">Cerrar Sesión</Link>
                    </div>
                ) : (
                    <div className="nav-links">
                        <Link to="/login" className="logIn">Inicia Sesión</Link>
                        <Link to="/register" className="register-btn">Registro</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}