import './MovieList.css';
import Cards from '../Cards/Cards';
import { useEffect, useState } from 'react';

const MovieList = () => {
    // State hooks for different categories of movies
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // API key from environment variables

    useEffect(() => {
        // Fetch data for each category of movies
        getData("top_rated", setTopRatedMovies);
        getData("popular", setPopularMovies);
        getData("upcoming", setUpcomingMovies);
        getData("now_playing", setNowPlayingMovies);
    }, []);

    const getData = (type) => {
        // Fetch movie data from The Movie Database API
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                // Set state based on the type of movie data fetched
                if (type === "top_rated") setTopRatedMovies(data.results);
                else if (type === "popular") setPopularMovies(data.results);
                else if (type === "upcoming") setUpcomingMovies(data.results);
                else if (type === "now_playing") setNowPlayingMovies(data.results);
            });
    }

    return (
        <>
            {/* Top Rated Movies Section */}
            <div className="movie-list">
                <h2 className="list-title">Top Rated Movies</h2>
                <div className="list-cards">
                    {topRatedMovies.slice(0, 11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>

            {/* Popular Movies Section */}
            <div className="movie-list">
                <h2 className="list-title">Popular Movies</h2>
                <div className="list-cards">
                    {popularMovies.slice(0, 11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>

            {/* Now Playing Movies Section */}
            <div className="movie-list">
                <h2 className="list-title">Now Playing Movies</h2>
                <div className="list-cards">
                    {nowPlayingMovies.slice(0, 11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>

            {/* Upcoming Movies Section */}
            <div className="movie-list">
                <h2 className="list-title">Upcoming Movies</h2>
                <div className="list-cards">
                    {upcomingMovies.slice(2, 13).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>
        </>
    )
}
export default MovieList;