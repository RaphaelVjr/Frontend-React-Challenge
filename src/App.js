
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Sign/SignUp';
import MoviesGrid from './pages/MoviesGrid'
import MovieCard from './components/MovieCard/MovieCard';
import FileUpload from './components/Movies/FileUpload/FileUpload';
import NotFoundPage from './components/NotFoundPage';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<MoviesGrid />} />
        <Route path="/fileUpload" element={<FileUpload />} />
        <Route path="/home" element={<MovieCard />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
