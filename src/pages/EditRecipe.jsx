import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import mortero from '../assets/mortero.png';
import incense from '../assets/incense-stick.png';
import edit from '../assets/edit2.png';
import '../css/estilos.css';

function EditRecipe() {
    // si el tamaño de pantalla cambia a ser menos de 688px, el fondo de pantalla se ajustará a formato Mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 688);
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
    };
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 688);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            // window.removeEventListener('resize', handleResize);
            cleanup();
        };
    }, []);

    const [editedRecipe, setEditedRecipe] = useState({
        namerecipe: '',
        userowner: '',
        intentions: '',
        whenuse: '',
        ingredients: '',
        instructions: '',
        howuse: '',
        magicuses: '',
        medicaluses: '',
        cautions: '',
        notes: '',
    });
    const navigate = useNavigate();
    const { recipeId } = useParams();

    // mensaje que aparecerá una vez que el uduario haya guardado los cambios para editar la receta
    const [message, setMessage] = useState('');

    useEffect(() => {
        //Se obtiene la información de la receta desde la base de datos usando el ID de la receta
        axios
            .get(`https://fullstack-proyecto-recetas-blog.onrender.com/get-recipe/${recipeId}`)
            .then((response) => {
                setEditedRecipe(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la receta para editar:', error);
            });
        // console.log('solicitud GET', recipeId);
    }, [recipeId]);

    const handleInputChange = (e) => {
        //Se ingresan los valores del formulario para editar la receta
        e.preventDefault();
        const { name, value } = e.target;
        setEditedRecipe((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        //Se realiza la actualización de la receta
        axios
            .put(
                `https://fullstack-proyecto-recetas-blog.onrender.com/update-recipe/${recipeId}`,
                editedRecipe
            )
            .then((response) => {
                setMessage(response.data.message);
                console.log('Receta actualizado con éxito: ', response.data);
                setTimeout(() => {
                    setMessage('');
                    navigate('/recipe-book'); //Se redirige al usuario a la página de visualización de la receta actualizada
                }, 4000);
            })
            .catch((error) => {
                console.log('Error al actualizar la receta: ' + error);
            });
    };

    const handleCancel = () => {
        navigate('/recipe-book'); // redirige a la página RecipeBook o Recetario
    };

    return (
        <>
            <div className="edit-recipe">
                <div className="flex-container">
                    <h2 className="title">Edita tu Receta</h2>
                    <img
                        src={edit}
                        alt="caldero mágico"
                        className="icon caldero"
                    />
                </div>

                <div className="icons-template">
                    <img
                        src={mortero}
                        alt="mortero mágico"
                        className="icon mortero"
                    />
                    <img
                        src={incense}
                        alt="incienso"
                        className="icon incense"
                    />
                </div>

                <div className="form-container">
                    <form className="form-edit">
                        <label htmlFor="namerecipe">Nombre de la Receta:</label>
                        <input
                            type="text"
                            name="namerecipe"
                            id="namerecipe"
                            placeholder="Nombre de tu receta"
                            value={editedRecipe.namerecipe}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="userowner">Hecho por:</label>
                        <input
                            type="text"
                            name="userowner"
                            id="userowner"
                            placeholder="Nombre de bruja o brujo"
                            value={editedRecipe.userowner}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="intentions">¿Qué usos tiene?</label>
                        <input
                            type="text"
                            name="intentions"
                            id="intentions"
                            placeholder="Para qué sirve"
                            value={editedRecipe.intentions}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="whenuse">Cuándo usarlo:</label>
                        <input
                            type="text"
                            name="whenuse"
                            id="whenuse"
                            value={editedRecipe.whenuse}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="ingredients">Ingredientes:</label>
                        <input
                            type="text"
                            name="ingredients"
                            id="ingredients"
                            placeholder="Ingredientes mágicos..."
                            value={editedRecipe.ingredients}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="instructions">¿Cómo crearlo?</label>
                        <input
                            type="text"
                            name="instructions"
                            id="instructions"
                            placeholder="Pasos para su elaboración"
                            value={editedRecipe.instructions}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="howuse">¿Cómo se usa?</label>
                        <input
                            type="text"
                            name="howuse"
                            id="howuse"
                            value={editedRecipe.howuse}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="magicuses">Uso Mágico:</label>
                        <input
                            type="text"
                            name="magicuses"
                            id="magicuses"
                            placeholder="¿Qué propiedades mágicas posee?"
                            value={editedRecipe.magicuses}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="medicaluses">Uso Medicinal:</label>
                        <input
                            type="text"
                            name="medicaluses"
                            id="medicaluses"
                            placeholder="¿Qué propiedades medicinales tiene?"
                            value={editedRecipe.medicaluses}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="cautions">Precauciones:</label>
                        <input
                            type="text"
                            name="cautions"
                            id="cautions"
                            placeholder="La seguridad es primero"
                            value={editedRecipe.cautions}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="notes">Notas:</label>
                        <input
                            type="text"
                            name="notes"
                            id="notes"
                            placeholder="Añade los toques finales"
                            value={editedRecipe.notes}
                            onChange={handleInputChange}
                        />

                        <div className="btns-division">
                            <button
                                type="submit"
                                className="btn save-recipe"
                                onClick={handleUpdate}
                            >
                                Guardar Cambios
                            </button>
                            <button
                                type="button"
                                className="btn cancel-recipe"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>

                        {message && (
                            <div
                                className={`modal-edit-recipe ${
                                    isMobile
                                        ? 'mobile-edit-bg'
                                        : 'desktop-edit-bg'
                                }`}
                            >
                                <div className="modal-edit-content">
                                    <p>{message}</p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditRecipe;
