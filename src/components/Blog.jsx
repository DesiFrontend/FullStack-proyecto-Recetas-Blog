import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from '../components/Posts';


export default function Blog() {

  const [otherUsersRecipes, setOtherUsersRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/other-users-recipes') //Se muestran todas las recetas creadas por los usuarios
      .then(response => {
        setOtherUsersRecipes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las recetas de otros usuarios:', error);
      });
  }, []);

  //Se llama al componente POSTS
  return (
    <div className="users-recipes">
      {
        otherUsersRecipes.map(recipe => (
          <Posts recipe={recipe} key={recipe.recipeId} />
        ))
      }
    </div>
  );

}