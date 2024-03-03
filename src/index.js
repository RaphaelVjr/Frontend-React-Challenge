import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Sign/SignUp';
import Home from './pages/Home';
import MoviesGrid from './pages/MoviesGrid'
import MovieCard from './components/MovieCard';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Login />,
  },
  {
    path: '/home', 
    element: <Home />,
  },
  {
    path: '/movies', 
    element: <MoviesGrid />,
  },
  {
    path: '/movie-card',
    element: <MovieCard />
  },
  {
    path: '/sign',
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
