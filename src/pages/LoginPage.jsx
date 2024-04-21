// Ingresamos las credenciales correspondientes para iniciar sesión.
// Importamos las librerías necesarias para la página,
// usamos Axios para las peticiones HTTP,
// utilizamos el Hook de useState para manejar los estados
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import '../css/estilos.css';
import witch from '../assets/witch_woman.png';
import backgroundstars from '../assets/fondo-gris-estrellas.png';

function LoginPage() {
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
    };
    // si el tamaño de pantalla cambia a ser menos de 688px, el fondo de pantalla se ajustará a formato Mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 688);
    const [message, setMessage] = useState('');
    // si el usuario cambia el tamaño de pantalla a móvil el fondo cambiará y se adaptará
    const [background, setBackground] = useState('');

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 688);
        const screenWidth = window.innerWidth;
        if (screenWidth < 688) {
            setBackground('../assets/fondo-gris-estrellas-movil.png');
        } else {
            setBackground('../assets/fondo-gris-estrellas.png');
        }
    };

    useEffect(() => {
        // Llamamos al handleResize una vez al cargar la página para establecer el fondo inicial
        handleResize();

        // Agregamos un listener de evento de rendimensionamiento para actualizar el fondo
        // cuando cambien el tamaño de la pantalla
        window.addEventListener('resize', handleResize);

        // Limpiamos el listener de evento cuando el componente se desmonta para evitar fugas de memoria
        return () => {
            // window.removeEventListener('resize', handleResize);
            cleanup();
        };
    }, []);

    const navigate = useNavigate(); // Si el usuario ha iniciado sesión, navigate lo llevara al dashboard.

    const { login, setUser, setUserId } = useAuth(); // agregamos el setUser del contexto

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/recipe-book'); // redirige al dashboard si hay un token
        }
    }, [navigate]);

    // Se ingresan los datos con el que el usuario se registro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // mensaje que aparecerá si el usuario no introduce bien los datos de su cuenta
    // const [message, setMessage] = useState('');

    // se hacen las comprobaciones del correo y el password con el
    // AuthContext, y si todo los datos son correctos, será mandado al dashboard con el uso de useNavigate
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password); // esperamos la respuesta del login
            // console.log('respuesta del incio de sesión;', response);
            const { access_token, userId } = response.data; // recogemos el token desde la respuesta
            // console.log(response.data);
            // console.log('userId en la respuesta:', userId);
            localStorage.setItem('token', access_token); //almacenamos el token en el localStorage
            setUser({}); // actualizamos el estado de autenticación
            setUserId(userId); // actualiza el userId en el contexto
            navigate('/recipe-book');
        } catch (error) {
            setMessage('El correo o la contraseña no son correctos');
            console.error(
                'Error en Inicio de sesión:',
                error.response ? error.response.data : error
            );
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
    };

    return (
        <div className="login">
            <div
                className="background-stars"
                style={{ backgroundImage: `url(${backgroundstars})` }}
            ></div>
            <div className="flex-container">
                <h2 className="title">Inicia Sesión</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="form-inputs">
                        <div className="img-login">
                            <img
                                className="witch-login"
                                src={witch}
                                alt="bruja de caricatura"
                            />
                        </div>

                        <label htmlFor="email">Correo:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Correo electrónico"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Contraseña mágica"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="buttons-login">
                        <button type="submit" className="btn login-btn">
                            Inicia Sesión
                        </button>
                        <Link to={'/register'} className="link-register">
                            Crear Cuenta
                        </Link>
                    </div>
                    {message && (
                        <div
                            className={`modal-login ${
                                isMobile ? 'mobile-bg' : 'desktop-bg'
                            }`}
                        >
                            <div className="modal-contenido">
                                <p>{message}</p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
