import './Navbar.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import m4nLogo from '../../assets/M4N logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            setLoading(true);
            const API_KEY = 'ebe99bbe7c3aadee21ea5ad3e5ff9bbf';
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${term}`);
                const data = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

        const handleMovieClick = (movie) => {
            setSearchTerm('');
            setResults([]);
            navigate(`/movie/${movie.id}`, { state: { movie } });
        };

        const handleAuthClick = async () => {
        if (isLoggedIn) {
            await supabase.auth.signOut();
            setIsLoggedIn(false);
        } else {
            navigate('/login');
        }
    };

    const handleSignUp = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            setIsLoggedIn(true);
            navigate('/');
        }
    };
    return (
        <>
            <header className='navbar'>
                <a href='/' className='a-img'><img className='logo' src={m4nLogo} alt='M4N Logo' /></a>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='search-bar'>
                        <SearchIcon className='search-icon' />
                        <input
                            className='search-input'
                            type='search'
                            placeholder='Search for your movies...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>
                <nav>
                    <div className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/awards'>Awards</a></li>
                        <li><a href='/contact'>Contact</a></li>
                        <li><a href='/about'>About</a></li>
                    </ul>
                </nav>
                <a className='cta' href='/login' onClick={handleAuthClick}>
                    <button>
                        {isLoggedIn ? 'Log Out' : 'Sign In'}
                        <div className='arrow-wrapper'>
                            <div className='arrow'></div>
                        </div>
                    </button>
                </a>
                <ul className='search-results'>
                    {loading ? (
                        <li className='loading'>Loading...</li>
                    ) : (
                        results.map(result => (
                            <li key={result.id} onClick={() => handleMovieClick(result)}>
                                {result.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                        alt={result.title || result.name}
                                        className='movie-poster'
                                    />
                                ) : (
                                    <div className='no-poster'>No Image</div>
                                )}
                                <div className='movie-info'>
                                    <h3>{result.title || result.name}</h3>
                                    <p>{(result.release_date || result.first_air_date || 'N/A').substring(0, 4)}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </header>
        </>
    );
};

export default Navbar;