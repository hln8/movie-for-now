import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabaseClient";
import Cards from "../../components/Cards/Cards";
import './Favorites.css'



const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Favorites = () => {
  const { user } = useAuth();  // Get the current user
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch user's favorite movies when the user changes
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);

      // Fetch favorite movie entries from Supabase
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.error("Error fetching favorites:", error.message);
      else {

        // Fetch detailed movie info from TMDB for each favorite
        const detailedFavs = await Promise.all(
          favs.map(async (fav) => {
            const res = await fetch(
              ` https://api.themoviedb.org/3/movie/${fav.movie_id}?api_key=${API_KEY}&language=en-US`
            );
            const movieDetails = await res.json();

            // Add favId from Supabase to each movie object for later use

            return { ...movieDetails, favId: fav.id };
          })
        );
        setFavorites(detailedFavs);  // Update favorites state with detailed info
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]); // Re-run effect when user changes


   // Remove a movie from favorites
  const handleRemoveFavorite = async (favId) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favId);  // Delete by favorite ID

    if (error) console.error("Error removing favorite:", error.message);
    else setFavorites(prev => prev.filter(f => f.favId !== favId)); // Remove from state
  };
 
    // Conditional rendering based on state
  if (loading)
    return <div className="loader">
      <div className="loader-dots">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>;
  if (!user)
    return <h2 className="fav-message"> Please log in to view your favorites</h2>;
  if (favorites.length === 0)
    return <h2 className="fav-message"> No movies added to Your favorites yet</h2>;


  // Render favorite movies
  return (
    <div className="favorites-container">
      <h2 className="list-title"> Your Favorites</h2>
      <div className="list-cards">
        {favorites.map((movie) => (
          <div key={movie.id} style={{ position: "relative" }}>
            <Cards movie={movie} />
            <button
              className="remove-bt"
              onClick={() => handleRemoveFavorite(movie.favId)}
            >
              Remove
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;