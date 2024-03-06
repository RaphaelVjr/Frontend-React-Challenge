import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

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

const getMoviePosters = async (movies) => {
  const posters = {}

  for (let movie of movies) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?${ApiKey}&query=${encodeURIComponent(movie.title)}`);
    const data = await res.json();

    if (data.results.length > 0) {
      // Use the poster of the first matching movie
      posters[movie.title] = data.results[0].poster_path ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` : 'N/A';
    } else {
      posters[movie.title] = 'N/A';
    }
  }

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
