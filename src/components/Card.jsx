import React from 'react';
import '../styles/Card.scss';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';


function Card({ recipe, setRecipes }) {

  const { userId } = useAuth(); // se obtiene el userId del usuario

  const handleDelete = () => { // Aquí se elimina la receta haciendo click en el botón de Eliminar
    axios.delete(`http://localhost:5000/delete-recipe/${recipe.recipeId}`)
    .then(_response => {
      // Actualiza las recetas después de la eliminación
      axios.get(`http://localhost:5000/create-recipe/user/${userId}/recetas`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las recetas después de eliminar:', error)
      });
    })
    .catch(error => {
      console.error('Error al eliminar la receta:', error);
    })
  }

    return (
        <>
            <div className="card-division">
                <div className="my-card">
                    <div className="card-body">
                            <h4 className="card-title">{recipe.namerecipe}</h4>
                            <h4 className='card-owner'>{recipe.userowner}</h4>
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
                    <div className="btns-edit-delete">
                        <Link to={`/update-recipe/${recipe.recipeId}`} className='btn edit-btn'>Editar Receta</Link>
                        <button onClick={handleDelete} className='btn delete-btn'>Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Card;