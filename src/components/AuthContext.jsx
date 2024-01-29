import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [userId, setUserId] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const {access_token, userId } = response.data; // el servidor devuelve un token
            Cookies.set('token', access_token); // se guarda el token en la cookie 'token'
            setUserId(userId);
            window.localStorage.setItem('userId', userId);
            return response; //devolvemos la respuesta completa que contiene el token 
        } catch (error) {
            console.error('Error al Iniciar Sesión: ' + error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Eliminar el token del localStorage al cerrar sesión
    };

    // función setUser para actualizar el estado de autenticación 
    const updateUser = (userData) => {
        setUser(userData);
    }

    const value = {
        user,
        userId,
        login,
        logout,
        setUser: updateUser, // aquí establecemos setUser como la función updateUser
        setUserId
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};