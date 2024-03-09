import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import registerimg from '../assets/register.svg';
import '../styles/RegisterPage.scss';
import backgoundcalderos from '../assets/fondo-calderos.svg';

function RegisterPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 688);
  const [message, setMessage] = useState('');
  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
  }
  // si el usuario cambia el tamaño de pantalla a móvil el fondo cambiará y se adaptará
  const [background, setBackground] = useState('');
  const handleResize = () => {
      setIsMobile(window.innerWidth <= 688);
      const screenWidth = window.innerWidth;
      if(screenWidth < 688) {
        setBackground('../assets/fondo-calderos-movil.svg');
      } else {
        setBackground('../assets/fondo-calderos.svg');
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
    }
  }, []);



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
        if (res.data.status == '1') { // comprueba que el usuario ya existe
          setMessage('El usuario ya existe, intente otro correo');
          setTimeout(() => {
            setMessage('')
          }, 2000);
        } else {
          setMessage('Usuario creado con éxito, redirigiendo al Login'); // si todo se verifica correctamente, el usuario es redirigido al login
          setTimeout(()=> {
            setMessage('');
            navigate('/login');
          }, 2000);
        }
      })
      .catch((error) => {
        setMessage('Error al registrarse')
        console.log('Error en la petición:' + error);
      });
  }

  return (
    <>
      <div className='register'>
        <div className="bck-cauldrons" style={{backgroundImage: `url(${backgoundcalderos})`}}></div>
        <div className="flex-container">
          <h2 className="title">Regístrate</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} >
            <div className="form-inputs">
            <div className="img-register">
              <img src={registerimg} alt="libro de registro mágico" />
            </div>

              <label htmlFor="username">Nombre:</label>
            <input type="text" name="username" id="username" placeholder='Nombre de bruja'
              required onChange={handleChange} />

            <label htmlFor="email">Correo:</label>
            <input type="email" name="email" id="email" placeholder='Correo electrónico'
              required onChange={handleChange} />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" id="password" placeholder='Contraseña mágica'
              required onChange={handleChange} />
            </div>


            <div className="buttons-register">
              <button className='btn register-btn'>Registrarme</button>
              <Link to={'/login'} className='link-login'>Inicia Sesión</Link>
            </div>
            {
                        message && <div className={`modal-login ${isMobile ? 'mobile-bg' : 'desktop-bg'}`}>
                                <div className="modal-contenido">
                                    <p>{message}</p>
                                </div>
                        </div>
                    }
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage