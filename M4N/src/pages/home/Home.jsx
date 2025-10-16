import './Home.css';
import MovieList from '../../components/MovieList/MovieList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // API key from environment variables

const Home = () => {
    // State hooks for popular and top-rated movies
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        // Fetch popular movies from the API
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => setPopularMovies(data.results)); // Set popular movies state

        // Fetch top-rated movies from the API
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => setTopRatedMovies(data.results)); // Set top-rated movies state
    }, []);

    return (
        <>
            <div className="poster">
                <Carousel 
                    showThumbs={false} // Hide thumbnails
                    autoPlay={true} // Enable autoplay
                    transitionTime={3} // Transition time between slides
                    infiniteLoop={true} // Infinite looping of slides
                    showStatus={false} // Hide status
                >
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} style={{ textDecoration: 'none', color: 'white' }} to={`/movie/${movie.id}`}>
                                <div className="poster-image">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.title} /> {/* Movie backdrop image */}
                                </div>
                                <div className="poster-overlay"> {/* Overlay for movie details */}
                                    <div className="poster-title">{movie ? movie.title : ""}</div> {/* Movie title */}
                                    <div className="poster-runtime">
                                        {movie ? movie.release_date : ""} {/* Release date */}
                                        <span className="poster-rating">
                                            {movie ? movie.vote_average : ""} <i className="fas fa-star" /> {/* Movie rating */}
                                        </span>
                                    </div>
                                    <div className="poster-description">{movie ? movie.overview : ""}</div> {/* Movie description */}
                                </div>
                            </Link>
                        ))  
                    }
                </Carousel>
                <MovieList /> {/* Render the MovieList component */}
            </div>
        </>
    )
}
export default Home;