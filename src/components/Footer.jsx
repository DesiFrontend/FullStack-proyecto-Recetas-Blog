import React from 'react';
import '../styles/Footer.scss';
import cualdron from '../assets/cauldron.svg';
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
                                <h2>Dirección:</h2>
                                <div className="content">
                                    <Icons.FaBroom />
                                    <p>Calle De las Rosas, Col. El Prado. 13</p>
                                </div>
                            </div>
                            <div className="box">
                                <h2>Teléfono:</h2>
                                <div className="content">
                                    <Icons.FaHatWizard />
                                    <p>+34 47 294 165</p>
                                </div>
                            </div>
                            <div className="box">
                                <h2>Correo Electrónico:</h2>
                                <div className="content">
                                    <Icons.FaCat />
                                    <p>recetasnaturales@gmail.mx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="box">
                            <h2>Síguenos en:</h2>
                            <div className="social-media">
                                <Icons.FaFacebook />
                                <Icons.FaInstagram />
                                <Icons.FaTwitter />
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        <Link to='/'><img className='cauldron-logo' src={cualdron} alt="caldero mágico" /></Link>
                        <p className='title-logo'>Recetas Naturales Con Mágia</p>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p><small>&copy; 2023 <b>Recetas Naturales Con Mágia</b> - La mágia ocurre cuando amas lo que haces.</small></p>
            </div>
        </>
    )
}

export default Footer;