import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './MovieCard.css';
import { toast } from 'react-toastify';

const ApiKey = 'api_key=370c9e0ff0179afc2b5f12a30b202de9';

const MovieCard = ({ movie }) => {
  return (
    <section>
      <div className="movie-box">
        <div className="movie-info">
          <img alt="movie poster" src={movie.posterUrl} />
          <div className="movie-name">{movie.title}</div>
          <div className="review">IMDB: {parseFloat(movie.average_score).toFixed(1)} <FontAwesomeIcon icon={faStar} color="orange" />
          </div>
        </div>
      </div>
    </section>
  );
};


const handleLogout = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast.success('Logged out successfully.', {
      });
      setTimeout(() => {
        window.location.href = '/';
    }, 2000);
    } else {
      toast.error('Failed to log out.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};


const getMoviePosters = async (movies) => {
  const posters = {}

  const fetchPromises = movies.map(movie => 
    fetch(`https://api.themoviedb.org/3/search/movie?${ApiKey}&query=${encodeURIComponent(movie.title)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results.length > 0) {
          posters[movie.title] = data.results[0].poster_path ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` : 'N/A';
        } else {
          posters[movie.title] = 'N/A';
        }
      })
      .catch(error => {
        if (error.message === 'Failed to fetch') {
          toast.error('Backend server is not running. Please start the server and try again.', {
            position: toast.POSITION.TOP_CENTER
          });
          posters[movie.title] = 'N/A';
        } else {
          console.error('An unexpected error occurred:', error);
        }
      })
  );


  await Promise.all(fetchPromises);

  return posters;
};

const MovieCarousel = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(window.innerWidth <= 768 ? 100 : 20 );

  useEffect(() => {
    const handleResize = () => {
      setCenterSlidePercentage(window.innerWidth <= 768 ? 100 : 20);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://127.0.0.1:3000/movies', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept-Language': 'pt-BR',
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const posters = await getMoviePosters(data);
        const moviesWithPosters = data.map(movie => ({
          ...movie,
          posterUrl: posters[movie.title] || 'N/A',
        }));
        setMovies(moviesWithPosters);
      } else {
        console.error('Failed to fetch movies');
      }
    };

    fetchMovies();
  }, []);


  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      
      <div className='logout-container'>
      <button class="Btn" onClick={handleLogout}>
        <div class="logout">
            <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
        </div>
        <div class="text">Desconectar</div>
    </button>
      </div>
      <div className='movie-search'>
        <FontAwesomeIcon className="fa-icon-search" icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className='card-title-container'>
        <span className='card-title'>Popular Movies</span>
        <span className='movie-underline'></span>
      </div>
      <Carousel showIndicators={false} centerMode
        centerSlidePercentage={centerSlidePercentage} autoPlay={true} interval={2500} showThumbs={false}>
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
