import './Cards.css';
import { Link } from 'react-router-dom';

const Cards = ({ movie }) => {
    return (
<>
    {/* Link to the movie detail page */}
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <div className="card">
            {/* Movie poster image */}
            <img
                className='card-image'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="card-overlay">
                {/* Movie title */}
                <div className="card-title">{movie.title}</div>
                {/* Movie release date and rating */}
                <div className='card-runtime'>
                    {movie.release_date}
                    <span className='card-rating'>{movie.vote_average}</span>
                </div>
                {/* Short description of the movie */}
                <div className="card-description">
                    {movie.overview.slice(0, 118) + "..."}
                </div>
            </div>
        </div>
    </Link>
</>
    )
}

export default Cards;