import React from 'react';
import '../styles/Posts.scss';

// El Post solo muestra la información de las recetas creadas por los usuarios pero sin la posibilidad de eliminarlas o modificarlas.
// Solo se puden editar o eliminar las recetas creadas dentro de la cuenta del usuario.

function Posts({ recipe }) {
    return (
        <>
            <div className="post-division">
                <div className="my-post">
                    <div className="post-body">
                        <h4 className="post-title">{recipe.namerecipe}</h4>
                        <h4 className='post-owner'>{recipe.userowner}</h4>
                        <p><span>Uso: </span>{recipe.intentions}</p>
                        <p><span>Cúando usarlo: </span>{recipe.whenuse}</p>
                        <p><span>Ingredientes: </span>{recipe.ingredients}</p>
                        <p><span>Cómo hacerlo: </span>{recipe.instructions}</p>
                        <p><span>Como usarlo: </span>{recipe.howuse}</p>
                        <p><span>Usos Mágicos: </span>{recipe.magicuses}</p>
                        <p><span>Uso Medicinal: </span>{recipe.medicaluses}</p>
                        <p><span>Precauciones: </span>{recipe.cautions}</p>
                        <p><span>Notas: </span>{recipe.notes}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts