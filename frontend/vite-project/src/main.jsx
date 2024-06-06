// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './roots/Home';
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Admin from './roots/Admin.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: <Navbar />,
  },
  {
    path: '/recipes',
    element: <Navbar />,
  },
  {
    path: '/recipeView',
    element: <Navbar />,
  },
  {
    path: '/recipeView/:rid',
    element: <Navbar />,
  },
  {
    path: '/myRecipes',
    element: <Navbar />,
  },
  {
    path: '/admin',
    element: <AdminRoute element={Admin} />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
