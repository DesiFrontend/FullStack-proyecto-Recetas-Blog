// Ingresamos las credenciales correspondientes para iniciar sesión.
// Importamos las librerías necesarias para la página,
// usamos Axios para las peticiones HTTP,
// utilizamos el Hook de useState para manejar los estados
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.scss';
import stars from '../assets/stars.svg';

function LoginPage() {

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
      alert('El correo o la contraseña no son correctos');
      console.error('Error en Inicio de sesión:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className='login'>
      <div className="flex-container">
        <h2 className="title">Inicia Sesión</h2>
        <img src={stars} alt="" className='icon' />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} method='POST'>
          <label htmlFor="email">Correo:</label>
          <input type="email" name="email" id="email" placeholder='Correo electrónico'
            required onChange={(e) => setEmail(e.target.value)} value={email} />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" id="password" placeholder='Contraseña mágica'
            required onChange={(e) => setPassword(e.target.value)} value={password} />

          <button type='submit' className='btn login-btn'>Inicia Sesión</button>
          <Link to={'/register'} className='link-register'>Crear Cuenta</Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;