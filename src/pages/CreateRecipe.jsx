import React from 'react';
import create from '../assets/create.png';
import mortero from '../assets/mortero.png';
import incense from '../assets/incense-stick.png';
import '../css/estilos.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialRecipeState = {
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
};

function CreateRecipe() {
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
            cleanup();
        };
    }, []);

    // el estado sirve para manejar los campos del formulario y las recetas
    const [recipeForm, setRecipeForm] = useState(initialRecipeState);
    const [formReset, setFormReset] = useState(false);
    const [message, setMessage] = useState('');

    const { userId } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        // se cambia el valor de acuerdo a lo que el usuario va escribiendo en los inputs
        const { name, value } = event.target;
        setRecipeForm({ ...recipeForm, [name]: value });
    };

    // ombre de la receta, ingredientes, instrucciones requeridos

    const handleSubmit = (event) => {
        //se envian los datos del formulario a la base de datos
        event.preventDefault();

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log('UserId antes de enviar la solicitud:', userId);
        //comprueba la relacion de las tablas de usuarios y recetas con el userId

        axios
            .post(
                'https://fullstack-proyecto-recetas-blog.onrender.com/create-recipe',
                { ...recipeForm, userId },
                config
            )
            .then((response) => {
                setMessage(response.data.message);
                console.log('Receta enviada correctamente:', response.data);
                setTimeout(() => {
                    setMessage('');
                    navigate('/recipe-book');
                }, 4000); // es el tiempo que dura la visualización del Modal para el usuario
            })
            .catch((error) => {
                console.error('Error al enviar la receta:', error);
            });
    };

    // limpiar el formulario despúes de enviarlo si es necesario
    const resetForm = () => {
        setRecipeForm(initialRecipeState);
        setFormReset(true);
        setTimeout(() => {
            setFormReset(false);
        }, 0);
    };

    return (
        <div className="create-recipe">
            <div className="flex-container">
                <h2 className="title">Crea una Receta</h2>
                <img
                    src={create}
                    alt="creación de receta"
                    className="icon-create"
                />
            </div>

            <div className="icons-template">
                <img
                    src={mortero}
                    alt="mortero mágico"
                    className="icon mortero"
                />
                <img src={incense} alt="incienso" className="icon incense" />
            </div>

            <div className="form-container">
                <form
                    className="form-create"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <input type="hidden" name="userId" />

                    <label htmlFor="namerecipe">Nombre de la Receta:</label>
                    <input
                        type="text"
                        name="namerecipe"
                        id="namerecipe"
                        placeholder="Nombre de tu receta"
                        value={recipeForm.namerecipe}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="userowner">Hecho por:</label>
                    <input
                        type="text"
                        name="userowner"
                        id="userowner"
                        placeholder="Nombre de bruja o brujo"
                        value={recipeForm.userowner}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="intentions">¿Qué usos tiene?</label>
                    <input
                        type="text"
                        name="intentions"
                        id="intentions"
                        placeholder="Para qué sirve"
                        value={recipeForm.intentions}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="whenuse">Cuándo usarlo:</label>
                    <input
                        type="text"
                        name="whenuse"
                        id="whenuse"
                        value={recipeForm.whenuse}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="ingredients">Ingredientes:</label>
                    <input
                        type="text"
                        name="ingredients"
                        id="ingredients"
                        placeholder="Ingredientes mágicos..."
                        value={recipeForm.ingredients}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="instructions">¿Cómo crearlo?</label>
                    <input
                        type="text"
                        name="instructions"
                        id="instructions"
                        placeholder="Pasos para su elaboración"
                        value={recipeForm.instructions}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="howuse">¿Cómo se usa?</label>
                    <input
                        type="text"
                        name="howuse"
                        id="howuse"
                        value={recipeForm.howuse}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="magicuses">Uso Mágico:</label>
                    <input
                        type="text"
                        name="magicuses"
                        id="magicuses"
                        placeholder="¿Qué propiedades mágicas posee?"
                        value={recipeForm.magicuses}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="medicaluses">Uso Medicinal:</label>
                    <input
                        type="text"
                        name="medicaluses"
                        id="medicaluses"
                        placeholder="¿Qué propiedades medicinales tiene?"
                        value={recipeForm.medicaluses}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="cautions">Precauciones:</label>
                    <input
                        type="text"
                        name="cautions"
                        id="cautions"
                        placeholder="La seguridad es primero"
                        value={recipeForm.cautions}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="notes">Notas:</label>
                    <input
                        type="text"
                        name="notes"
                        id="notes"
                        placeholder="Añade los toques finales"
                        value={recipeForm.notes}
                        onChange={handleInputChange}
                    />

                    <div className="btns-division">
                        <button type="submit" className="btn post-recipe">
                            Publicar receta
                        </button>
                        <button
                            type="reset"
                            className="btn reset-form"
                            onClick={resetForm}
                        >
                            Resetear formulario
                        </button>
                    </div>

                    {
                        // dependiendo del tamaño de pantalla: movil o escritorio, el modal se ajustará
                        message && (
                            <div
                                className={`modal-recetas ${
                                    isMobile ? 'mobile-bg' : 'desktop-bg'
                                }`}
                            >
                                <div className="modal-contenido">
                                    <p>{message}</p>
                                </div>
                            </div>
                        )
                    }
                    {formReset && (
                        <input type="reset" style={{ display: 'none' }} />
                    )}
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;
