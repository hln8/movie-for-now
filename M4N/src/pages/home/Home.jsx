import './Home.css';
import MovieList from '../../components/MovieList/MovieList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([]);
    const [ topRatedMovies, setTopRatedMovies ] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
        .then(res => res.json())
        .then(data => setPopularMovies(data.results));
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
        .then(res => res.json())
        .then(data => setTopRatedMovies(data.results));
    }, []);

    return (
        <>
            <div className="poster">
                <Carousel 
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/movie/${movie.id}`}>
                                <div className="poster-image">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.title} />
                                </div>
                                <div className="poster-overlay">
                                    <div className="poster-title">{movie ? movie.title : ""}</div>
                                    <div className="poster-runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="poster-rating">{movie ? movie.vote_average : ""} <i className="fas fa-star" /></span>
                                    </div>
                                    <div className="poster-description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))  
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}
export default Home;