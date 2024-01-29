import React from 'react';
import spellbook from '../assets/spellbook.svg';

function NotFoundPage() { // en caso de que la página no exista o el usuario introduzaca mal la los datos dara el error 404
    return (
        <>
            <main className='main-not-found'>
                <div className="flex-container">
                    <h2 className="title">¡Lo sentimos!</h2>
                    <p className='not-found'>No pudimos encontrar la página que buscas. </p>
                    <img src={spellbook} alt="receta no encontrada" className='icon-spellbook' />
                </div>
            </main>
        </>
    )
}

export default NotFoundPage;