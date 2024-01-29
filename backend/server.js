// Instalamos las dependencias
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
const salt = 10;
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

// Nos conectamos a la base de datos (.env)
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

try {
    dbConnection.connect(() => {
        console.log('Conectado correctamente a la BD');
    })
} catch (error) {
    console.log('Error al conectarse a la Base de Datos: ' + error);
};

// --- Ruta del Registro --- //

// función para generar un userId único, sirve para la relación de las tablas de los usuarios con la de recetas
function generateUniqueId() {
    const uniqueId = uuidv4();
    return uniqueId;
}

// registro de nuestro usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // comprueba que no exista un usuario o email ya existentes
    const userExist = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    dbConnection.query(userExist, [username, email], (err, results) => {
        if (err) {
            console.log("Error en el registro: " + err);
            res.status(500).send('Error en el servidor');
        } else if (results.length > 0) {
            res.json({
                status: 1,
                message: "El usuario o el email ya existen, por favor usa otro",
            });
        } else {
            // encriptación de contraseña
            bcrypt.hash(password.toString(), salt, (err, hash) => {
                if (err) {
                    res.json({ Error: 'Error al encriptar la contraseña' });
                } else {
                    // se genera un userId único 
                    const userId = generateUniqueId();
                    // Se insertan los datos del usuario, incluyendo el userId, en la bd
                    const values = 'INSERT INTO usuarios (`userId`, `username`, `email`, `password`) VALUES (?,?,?,?)';
                    dbConnection.query(values, [userId, username, email, hash],
                        (err) => {
                            if (err) {
                                console.log('Error en el registro del servidor: ' + err);
                                res.status(500).send('Error en el servidor');
                            } else {
                                res.json({
                                    status: 2,
                                    message: 'Registro completado con éxito',
                                });
                            }
                        });
                }
            });
        }
    });
});
// ---------------------------- //

// --- Ruta del Login --- //
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // comprobamos que los datos del usuario existen en la base de datos
    const credentialsExist = 'SELECT id, username, email, password, userId FROM usuarios WHERE email = ?';
    dbConnection.query(credentialsExist, [email], (err, results) => {
        if (err) {
            console.log('Error en el inicio de sesión: ' + err);
            res.status(500).send('Error en el servidor');
        } else if (results.length > 0) { // se comprueba la comparación de la contaseña encriptada de
            bcrypt.compare(password.toString(), results[0].password, (err, match) => {
                if (err) {
                    res.send(500).json({ Error: 'Error al comparar la contraseña' });
                    console.log('Error al comparar la contraseña');
                } else if (match) {
                    const user = {
                        id: results[0].id,
                        userId: results[0].userId,
                        email: results[0].email,
                        username: results[0].username,
                    } // Generamos el token JWT
                    const token = jwt.sign(user, "jwt-secret-key", { expiresIn: '1d' });
                    res.json({ message: 'Inicio de sesión exitoso', access_token: token, userId: user.userId });
                } else {
                    return res.status(401).json({ Error: 'La contraseña no coincide' })
                }
            })
        } else {
            return res.status(404).json({ Error: 'Email no encontrado' });
        }
    })
});
// ---------------------- //

// --- Middleware de verificación del token --- //
const verifyToken = (req, res, next) => { // verifica el acceso del usuario
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ Error: 'Acceso no autorizado' });
    }
    jwt.verify(token.split(' ')[1], "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ Error: 'Token inválido' });
        }
        req.user = decoded; // Aquí se decodifica y se guardan los datos del usuario en req.user
        // console.log(req.user);
        // aquí se verifican los permisos para crear recetas
        if (req.path === '/create-recipe' && req.method === 'POST') {
            const userIdFromToken = decoded.userId; //se obtiene el userId del token
            // console.log(userIdFromToken);
            const userIdFromRequest = req.body.userId; // se obtien el userId de la solicitud
            // console.log(userIdFromRequest); // undefined
            if (userIdFromToken !== userIdFromRequest) {
                return res.status(401).json({ Error: 'No estás autorizado para crear esta receta' });
            }
        }
        next();
    });
};

app.get('/', verifyToken, (req, res) => {
    return res.json({ Status: 'Entrada de datos exitoso', name: req.user.name });
});

app.get('/user', verifyToken, (req, res) => { // se comprueba que el usuario existe en la base de datos
    dbConnection.query('SELECT * FROM usuarios ORDER BY id ASC', (err, results) => {
        if (err) {
            console.error('Error en la consulta de la base de datos: ' + err);
            res.status(500).send('Error al obtener todos los usuarios');
        } else {
            res.json(results);
        }
    })
});
// --------------------------------------------------- //

// CRUD Receta
// --- Creamos una Nueva Receta --- //
app.post('/create-recipe', (req, res) => {
    const { userId, namerecipe, userowner, intentions, whenuse, ingredients, instructions, howuse, magicuses, medicaluses, cautions, notes } = req.body;
    const insertInputData = `INSERT INTO recetas (userId, namerecipe, userowner, intentions, whenuse, ingredients, instructions, howuse, magicuses, medicaluses, cautions, notes) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    dbConnection.query(insertInputData, [userId, namerecipe, userowner, intentions, whenuse, ingredients, instructions, howuse, magicuses, medicaluses, cautions, notes], (err, _result) => {
        if (err) {
            console.error('Error en la inserción en la base de datos:', err);
            res.status(500).send('Error al crear la receta');
        } else {
            console.log('Receta creada correctamente en la base de datos');
            res.status(200).json({ message: 'Receta creada con éxito, ve al Recetario para ver como quedo' });
        }
    });
});
// ------------------------------- //
// --- La receta creada por el usuario se visualiza en el componente RecipeBook (RECETARIO) --- //
app.get('/create-recipe/user/:userId/recetas', (req, res) => {
    const userId = req.params.userId;
    // console.log(req.params.userId);
    const getRecipesByUserId = 'SELECT * FROM recetas WHERE userId = ?'; //consulta que hacemos para obtener las recetas asociadas al userId
    dbConnection.query(getRecipesByUserId, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener las recetas del usuario:', err);
            res.status(500).json({ error: 'Error al obtener las recetas del usuario' });
        } else {
            res.status(200).json(results); //devuelve las recetas asociadas al usuario con el userId
        }
    });
});
// ------------------------------ //

// --- Editamos la Receta --- //
app.get(`/get-recipe/:recipeId`, (req, res) => { // Obtenemos la información de una receta específicapor su ID
    const recipeId = req.params.recipeId;
    const getRecipeQuery = 'SELECT * FROM recetas WHERE recipeId = ?';
    dbConnection.query(getRecipeQuery, [recipeId], (err, results) => {
        if (err) {
            console.error('Error al obtener la receta:', err);
            res.status(500).json({ error: 'Error al obtener la receta del servidor' });
        } else if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'Receta no encontrada' });
        }
    });
});

// Actualizamos la información de una receta específica con el ID
app.put(`/update-recipe/:recipeId`, (req, res) => {
    const recipeId = req.params.recipeId;
    const {
        namerecipe,
        userowner,
        intentions,
        whenuse,
        ingredients,
        instructions,
        howuse,
        magicuses,
        medicaluses,
        cautions,
        notes
    } = req.body;
    // console.log(req.body);
    const updateRecipeQuery = 'UPDATE recetas SET ? WHERE recipeId = ?';
    const updatedFields = {
        namerecipe,
        userowner,
        intentions,
        whenuse,
        ingredients,
        instructions,
        howuse,
        magicuses,
        medicaluses,
        cautions,
        notes
    };
    dbConnection.query(updateRecipeQuery, [updatedFields, recipeId], (err, _results) => {
        if (err) {
            console.error('Error al actualizar la receta:', err);
            res.status(500).json({ error: 'Error al actualizar la receta en el servidor' });
        } else {
            res.status(200).json({ message: 'Receta actualizada exitosamente' });
        }
    });
});
// ---------------------------- //

// --- Eliminamos la Receta --- //
// Se elimina la receta por medio de su identificador único (recipeId) como llave primaria
app.delete('/delete-recipe/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    const RecipeDelete = 'DELETE FROM recetas WHERE recipeId = ?';
    dbConnection.query(RecipeDelete, [recipeId], (err, results) => {
        if (err) {
            console.error('Error al eliminar la receta:', err);
            res.status(500).json({ error: 'Error al intentar eliminar la receta del servidor' });
        } else {
            res.status(200).json({ message: 'Receta eliminada exitosamente' });
        }
    });
});
// ---------------------------- //


// --- Blog, llamamos todas las recetas creadas por los usuarios --- //
app.get('/other-users-recipes', (req, res) => {
    //Se obtienen todas las recetas de los usuarios
    const getAllUsersRecipes = 'SELECT * FROM recetas'; 
    dbConnection.query(getAllUsersRecipes, (err, results) => {
        if (err) {
            console.error('Error al obtener las recetas de otros usuarios:', err);
            res.status(500).json({ error: 'Error al obtener las recetas de otros usuarios' });
        } else {
            res.status(200).json(results);
        }
    });
});
// ------------------------------ //

const port = process.env.PORT || 3306;
// Mensaje de que el Servidor se ha conectado correctamente al puerto 3306
app.listen(port, () => {
    console.log('Servidor levantado');
    console.log('Servidor conectado al puerto ' + port);
});