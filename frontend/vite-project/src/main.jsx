import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './roots/Home';
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar></Navbar>,
  },
  {
    path: '/recipes',
    element: <Navbar></Navbar>,
  },
  {
    path: '/recipeView',
    element: <Navbar></Navbar>,
  },
  {
    path: '/myRecipes',
    element: <Navbar></Navbar>,
  },
  {
    path: '/admin',
    element: <Navbar></Navbar>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
