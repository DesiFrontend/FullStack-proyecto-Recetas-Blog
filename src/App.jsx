import React from 'react';
import { Route, Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import RecipeBook from "./pages/RecipeBook";
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import { AuthProvider } from './components/AuthContext';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='*' element={<NotFoundPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipe-book" element={<RecipeBook />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/update-recipe/:recipeId" element={<EditRecipe />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;