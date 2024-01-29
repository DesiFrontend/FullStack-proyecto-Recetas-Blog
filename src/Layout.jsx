import React from 'react';
import Navbar from "./components/Navbar";
import { Outlet, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import RecipeBook from './pages/RecipeBook';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function Layout() {
    // Se crea el componente Layout para separar el contenido del Home, permitiendo una navegación más clara y la visualización
    // del contenido correspondiente según las acciones del usuario en el Navbar.
    return (
        <main className='layout-content'>
            <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/create-recipe' element={<RoutesCreateRecipe/>}/>
                <Route path='/recipe-book' element={<RoutesRecipeBook/>}/>
                <Route path='/blog' element={<Blog/>}/> 
            </Routes>
            <Outlet/>
            <Footer/>
        </main>
    );
}

 // En estas funciones: RoutesCreateRecipe y RoutesRecipeBook mostrarán sus contenidos específicos
 // como se representan en sus rutas, según su lógica o código corresponsiente
function RoutesCreateRecipe() {
    <CreateRecipe/>
}

function RoutesRecipeBook() {
    <RecipeBook/>
}