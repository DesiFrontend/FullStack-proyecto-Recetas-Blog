import React from 'react';
import '../css/estilos.css';

// El Post solo muestra la información de las recetas creadas por los usuarios pero sin la posibilidad de eliminarlas o modificarlas.
// Solo se puden editar o eliminar las recetas creadas dentro de la cuenta del usuario.

function Posts({ recipe }) {
    return (
        <>
            <div className="post-division">
                <div className="my-post">
                    <div className="post-body">
                        <h1 className="post-title">{recipe.namerecipe}</h1>
                        <h2 className="post-owner">{recipe.userowner}</h2>
                        <p>Uso: {recipe.intentions}</p>
                        <p>Cúando usarlo: {recipe.whenuse}</p>
                        <p>Ingredientes: {recipe.ingredients}</p>
                        <p>Cómo hacerlo: {recipe.instructions}</p>
                        <p>Como usarlo: {recipe.howuse}</p>
                        <p>Usos Mágicos: {recipe.magicuses}</p>
                        <p>Uso Medicinal: {recipe.medicaluses}</p>
                        <p>Precauciones: {recipe.cautions}</p>
                        <p>Notas: {recipe.notes}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Posts;
