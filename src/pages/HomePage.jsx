import React from 'react';
import smoke from '../assets/recetas_pantalla_principal_proyecto.png';
import cualdron from '../assets/cauldron-purple.png';
import '../css/estilos.css';
import Blog from '../components/Blog';

export default function HomePage() {
    return (
        <div className="not-logged">
            <div className="container">
                <img className="smoke" src={smoke} alt="título del proyecto" />
                <div className="content1">
                    <p>
                        ¿Alguna vez haz soñado con difundir tus conocimientos al
                        mundo? ¡Unete a nuestro "aquelarre"!
                    </p>

                    <p>
                        Y disfruta compartiendo tus recetas y creaciones sobre
                        el maravilloso mundo de los productos naturales.
                        Productos hechos con alma y una pizca de mágia.
                    </p>
                    <img
                        className="cauldron"
                        src={cualdron}
                        alt="caldero mágico"
                    />
                </div>
            </div>

            <div className="blog-recipes">
                <div className="blog-container">
                    <h2>Blog de Recetas</h2>
                    {/* Cards de las recetas creadas por los usuarios */}
                    <Blog />
                </div>
            </div>
        </div>
    );
}
