import './Navbar.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import m4nLogo from '../../assets/M4N logo.png';

const Navbar = () => {
    // State hooks for managing navbar features
    const [isOpen, setIsOpen] = useState(false); // Menu open/close state
    const [searchTerm, setSearchTerm] = useState(''); // Search term input
    const [results, setResults] = useState([]); // Search results
    const [loading, setLoading] = useState(false); // Loading state for search
    const [isLoggedIn, setIsLoggedIn] = useState(false); // User authentication state
    const navigate = useNavigate(); // Hook for navigation

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // API key from environment variables

    // Toggle the menu open/close state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle changes in the search input
    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            setLoading(true); // Start loading
            try {
                // Fetch search results from the API
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${term}`);
                const data = await response.json();
                setResults(data.results); // Update results
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false); // End loading
            }
        } else {
            setResults([]); // Clear results if input is empty
        }
    };

    // Handle movie click from search results
    const handleMovieClick = (movie) => {
        setSearchTerm(''); // Clear search term
        setResults([]); // Clear results
        navigate(`/movie/${movie.id}`, { state: { movie } }); // Navigate to movie details
    };

    // Handle authentication click (sign in or out)
    const handleAuthClick = async () => {
        if (isLoggedIn) {
            await supabase.auth.signOut(); // Sign out user
            setIsLoggedIn(false); // Update login state
        } else {
            navigate('/signIn'); // Navigate to sign-in page
        }
    };

    // Handle user sign-up
    const handleSignUp = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            setIsLoggedIn(true); // Update login state
            navigate('/'); // Navigate to home
        }
    };

    return (
        <>
            <header className='navbar'>
                <a href='/' className='a-img'>
                    <img className='logo' src={m4nLogo} alt='M4N Logo' /> {/* Logo */}
                </a>
                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                    <div className='search-bar'>
                        <SearchIcon className='search-icon' /> {/* Search icon */}
                        <input
                            className='search-input'
                            type='search'
                            placeholder='Search for your movies...'
                            value={searchTerm}
                            onChange={handleSearchChange} // Handle input change
                        />
                    </div>
                </form>
                <nav>
                    <div className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}> {/* Burger menu */}
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={`nav-links ${isOpen ? 'active' : ''}`}> {/* Navigation links */}
                        <li><a href='/'>Home</a></li>
                        <li><a href='/awards'>Awards</a></li>
                        <li><a href='/favorites'>Favorites</a></li>
                        <li><a href='/contact'>Contact</a></li>
                        <li><a href='/about'>About</a></li>
                    </ul>
                </nav>
                <a className='cta' href='/signIn' onClick={handleAuthClick}> {/* Call to action button */}
                    <button>
                        {isLoggedIn ? 'Log Out' : 'Sign In'} {/* Conditional text based on login state */}
                        <div className='arrow-wrapper'>
                            <div className='arrow'></div>
                        </div>
                    </button>
                </a>
                <ul className='search-results'> {/* Search results list */}
                    {loading ? (
                        <li className='loading'>Loading...</li> // Loading state
                    ) : (
                        results.map(result => (
                            <li key={result.id} onClick={() => handleMovieClick(result)}> {/* Movie click handler */}
                                {result.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                        alt={result.title || result.name} // Movie title or name
                                        className='movie-poster'
                                    />
                                ) : (
                                    <div className='no-poster'>No Image</div> // Fallback for missing images
                                )}
                                <div className='movie-info'>
                                    <h3>{result.title || result.name}</h3>
                                    <p>{(result.release_date || result.first_air_date || 'N/A').substring(0, 4)}</p> {/* Year of release */}
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