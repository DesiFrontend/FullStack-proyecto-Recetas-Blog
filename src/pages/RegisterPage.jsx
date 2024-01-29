import React from 'react';
import {useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.scss';
import bookRegister from '../assets/register-book.svg';

function RegisterPage() {

  const navigate = useNavigate(); //usamos navigate para navegar entre las páginas

  /* Datos del formulario para la creacion del usuario  */
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  /* Manejamos los cambios en los inputs del formulario.*/
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) { // se ingresan los datos del nuevo usuario
    e.preventDefault();
    axios.post(`http://localhost:5000/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.status === '1') { // comprueba que el usuario ya existe
          alert('El usuario ya existe, intente otro correo');
        } else {
          alert('Usuario creado con éxito, redirigiendo al Login'); // si todo se verifica correctamente, el usuario es redirigido al login
          navigate('/login');
        }
      })
      .catch((error) => {
        alert('Error al registrarse')
        console.log('Error en la petición:' + error);
      });
  }

  return (
    <>
      <div className='register'>
        <div className="flex-container">
          <h2 className="title">Regístrate</h2>
          <img src={bookRegister} alt="" className='icon' />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} >
            <label htmlFor="username">Nombre:</label>
            <input type="text" name="username" id="username" placeholder='Escribe tu nombre de bruja o brujo'
              required onChange={handleChange} />

            <label htmlFor="email">Correo:</label>
            <input type="email" name="email" id="email" placeholder='Correo electrónico'
              required onChange={handleChange} />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" id="password" placeholder='Contraseña mágica'
              required onChange={handleChange} />

            <button className='btn register-btn'>Registrarme</button>
            <Link to={'/login'} className='link-login'>Inicia Sesión</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage