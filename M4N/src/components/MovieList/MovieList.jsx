import './MovieList.css';
import Cards from '../Cards/Cards';
import { useEffect, useState } from 'react';

const MovieList = () => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    useEffect(() => {
        getData("top_rated", setTopRatedMovies);
        getData("popular", setPopularMovies);
        getData("upcoming", setUpcomingMovies);
        getData("now_playing", setNowPlayingMovies);
    }, []);

    const getData = (type) => {
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
            .then(res => res.json())
            .then(data => {
                if (type === "top_rated") setTopRatedMovies(data.results);
                else if (type === "popular") setPopularMovies(data.results);
                else if (type === "upcoming") setUpcomingMovies(data.results);
                else if (type === "now_playing") setNowPlayingMovies(data.results);
            });
    }

    return (
        <>
            <div className="movie-list">
                <h2 className="list-title">Top Rated Movies</h2>
                <div className="list-cards">
                    {topRatedMovies.slice(0,11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>
            <div className="movie-list">
                <h2 className="list-title">Popular Movies</h2>
                <div className="list-cards">
                    {popularMovies.slice(0,11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>
            <div className="movie-list">
                <h2 className="list-title">Now Playing Movies</h2>
                <div className="list-cards">
                    {nowPlayingMovies.slice(0,11).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>
            <div className="movie-list">
                <h2 className="list-title">Upcoming Movies</h2>
                <div className="list-cards">
                    {upcomingMovies.slice(2,13).map(movie => <Cards key={movie.id} movie={movie} />)}
                </div>
            </div>
        </>
    )
}
export default MovieList;