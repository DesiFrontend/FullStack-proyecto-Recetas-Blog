import React, { useState, useEffect } from 'react';
import axios from 'axios';
import speelbook from '../assets/speelbook.png';
import { useAuth } from '../components/AuthContext';
import Card from '../components/Card';
import '../css/estilos.css';

function RecipeBook() {
    const [recipes, setRecipes] = useState([]);
    const { userId } = useAuth(); // se obtiene el userId del usuario

    useEffect(() => {
        // Aquí se hace la solicitud GET al servidor para obtener las recetas del usuario
        axios
            .get(`https://fullstack-proyecto-recetas-blog.onrender.com/create-recipe/user/${userId}/recetas`)
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las recetas:', error);
            });
    }, []);

    function renderRecipes() {
        //Ésta función ejecuta el mensaje de "Aún no haz creado ninguna receta" si detecta que el usuario no tiene ninguna receta en la base de datos,
        // por otro lado, si ya cuenta con alguna receta hecha, se verá reflejada en el Recetario
        if (recipes.length === 0)
            return (
                <h1 className="recipe-main-text">
                    Aún no haz creado ninguna receta.
                </h1>
            );
        return recipes.map((recipe) => (
            <Card
                recipe={recipe}
                key={recipe.recipeId}
                setRecipes={setRecipes}
            />
        ));
    }

    return (
        <div className="recipe-book">
            <div className="flex-container">
                <h2 className="title">Recetario</h2>
                <img
                    src={speelbook}
                    alt="libro de recetas mágico"
                    className="icon-recipebook"
                />
            </div>
            {renderRecipes()}
        </div>
    );
}

export default RecipeBook;
