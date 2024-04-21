import React from 'react';
import '../css/estilos.css';
import cualdron from '../assets/cauldron-blanc.png';
import broom from '../assets/broom-solid.png';
import hatwitch from '../assets/hat-wizard-solid.png';
import catwitch from '../assets/cat-solid.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
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
                                    <img
                                        className="broom"
                                        src={broom}
                                        alt="escoba de bruja"
                                    />
                                    <p>Calle De las Rosas, Col. El Prado. 13</p>
                                </div>
                            </div>
                            <div className="box">
                                <h2>Teléfono:</h2>
                                <div className="content">
                                    <img
                                        className="hat-witch"
                                        src={hatwitch}
                                        alt="sombrero de bruja"
                                    />
                                    <p>+34 47 294 165</p>
                                </div>
                            </div>
                            <div className="box">
                                <h2>Correo Electrónico:</h2>
                                <div className="content">
                                    <img
                                        className="blackcat"
                                        src={catwitch}
                                        alt="gato negro"
                                    />
                                    <p>recetasnaturales@gmail.mx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="box">
                            <h2>Síguenos en:</h2>
                            <div className="social-media">
                                <a href="https://www.facebook.com/">
                                    <img
                                        className="facebook"
                                        src={facebook}
                                        alt="ícono de facebook"
                                    />
                                </a>
                                <a href="https://www.instagram.com/">
                                    <img
                                        className="instagram"
                                        src={instagram}
                                        alt="ícono de instagram"
                                    />
                                </a>
                                <a href="https://x.com/">
                                    <img
                                        className="twitter"
                                        src={twitter}
                                        alt="ícono de twitter"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        <Link to="/">
                            <img
                                className="cauldron-logo"
                                src={cualdron}
                                alt="caldero mágico"
                            />
                        </Link>
                        <p className="title-logo">
                            Recetas Naturales Con Mágia
                        </p>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>
                    <small>
                        &copy; 2023 <b>Recetas Naturales Con Mágia</b> - La
                        mágia ocurre cuando amas lo que haces.
                    </small>
                </p>
            </div>
        </>
    );
}

export default Footer;
