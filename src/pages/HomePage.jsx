import React from 'react';
import libro from '../assets/mystery-box.svg';
import '../styles/HomePage.scss';
import Blog from '../components/Blog';

export default function HomePage() {
    return (
        <div className="not-logged">
            <div className="container">
                <div className="content1">
                    <h2 className='title-recipes'>Recetas</h2>
                    <h1 className='principal-title'>Naturales con Mágia</h1>

                    <i>Cosmética natural y Bienestar emocional.</i>
                    <p>
                        ¿Alguna vez haz soñado con difundir tus conocimientos al mundo?
                        ¡Unete a nuestro "aquelarre"!
                    </p>

                    <p>
                        Y disfruta compartiendo tus recetas y creaciones sobre el maravilloso mundo de los productos naturales.
                        Productos hechos con alma y una pizca de mágia.
                    </p>
                </div>
                <div className="content2">
                    <img src={libro} alt="recetario mágico" />
                </div>
            </div>

            <div className="blog-recipes">
                <div className="blog-container">
                    <h2>Blog de Recetas</h2> 
                    {/* Cards de las recetas creadas por los usuarios */}
                    <Blog/>
                </div>
            </div>
        </div>
    )
}