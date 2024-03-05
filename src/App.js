
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Sign/SignUp';
import MoviesGrid from './pages/MoviesGrid'
import MovieCard from './components/MovieCard';
import FileUpload from './components/Movies/FileUpload/FileUpload';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<MoviesGrid />} />
        <Route path="/movie-card" element={<FileUpload />} />
        <Route path="/sign" element={<SignUp />} />
    </Routes>
  );
}

export default App;
