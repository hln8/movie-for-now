import './Cards.css';
import { Link } from 'react-router-dom';

const Cards = ({ movie }) => {
    return (
        <>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='card-image' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="card-overlay">
                <div className="card-title">{movie.title}</div>
                <div className='card-runtime'>{movie.release_date}
                    <span className='card-rating'>{movie.vote_average}</span>
                </div>
                <div className="card-description">{movie.overview.slice(0,118)+"..."}</div>
            </div>
            </div>
        </Link>
        </>
    )
}

export default Cards;