import React from 'react';
import '../styles/Footer.scss';
import Logo from '../assets/book_logo.png';
import * as Icons from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="grid-container">
                    <div className="section">
                        <div className="footer-info">
                            <div className="box">
                                <h3>Dirección:</h3>
                                <div className="content">
                                    <Icons.FaBroom />
                                    <p>Calle De las Rosas, Col. El Prado. 13</p>
                                </div>
                            </div>
                            <div className="box">
                                <h3>Teléfono:</h3>
                                <div className="content">
                                    <Icons.FaHatWizard />
                                    <p>+34 47 294 165</p>
                                </div>
                            </div>
                            <div className="box">
                                <h3>Correo Electrónico:</h3>
                                <div className="content">
                                    <Icons.FaCat />
                                    <p>recetasnaturales@gmail.mx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="box">
                            <h3>Síguenos en:</h3>
                            <div className="social-media">
                                <Icons.FaFacebook />
                                <Icons.FaInstagram />
                                <Icons.FaTwitter />
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        <Link to='/'><img src={Logo} alt="logotipo" className='icon' /></Link>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p><small>&copy; 2023 <b>Recetas Naturales Con Mágia</b> - Todos los Derechos Reservados.</small></p>
            </div>
        </>
    )
}

export default Footer;