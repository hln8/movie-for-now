import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthContext";
import './MovieDetails.css'
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [extraVideo, setExtraVideo] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    // MovieDetails
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data));

    // Cast
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => setCast(data.cast));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        // Find the main trailer
        const trailerData = data.results.find(v =>
          v.type === "Trailer" && v.site === "YouTube");
        setTrailer(trailerData);

        // 2.Find another Clip or Featurette
        const otherVideo = data.results.find(v =>
          (v.type === "Clip" || v.type === "Featurette") && v.site === "YouTube");
        setExtraVideo(otherVideo);
      });



    // similar movies
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setSimilarMovies(data.results));

    //extra Images
    fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setImages(data.backdrops.slice(0, 10)));

    // Check if the movie is on favorites
    if (user) {
      supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("movie_id", id)
        .then(({ data }) => setIsFavorite(data.length > 0));
    }
  }, [id, user]);

  if (!movie) return <h2 className="lod"> Loading...</h2>;

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate("/signIn");
      return;
    }

    if (isFavorite) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("movie_id", id);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert([{ user_id: user.id, movie_id: id, title: movie.title, poster: movie.poster_path }]);
      setIsFavorite(true);
    }
  };

  return (
    <div
      className="movie-details"
    >
      {/* Movie Details and button favorite  */}
      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="movie-poster" />

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <button className={`fav-btn ${isFavorite ? "added" : ""}`} onClick={handleToggleFavorite}>
            {isFavorite ? "❤️ Added" : "❤️ Add to Favorites"}
          </button>

          <h2><strong> {movie.overview}</strong></h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
          <p><strong>Rating:</strong> ⭐️ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</p>


          <div className="images-plus">
            {images.length > 0 && (
              <button className="toggle-images-btn" onClick={() => setShowImages(prev => !prev)}>
                {showImages ? "Hide Images" : "View Images"}
              </button>
            )}

            {/* Extra Images  */}
            {showImages && (
              <div className="movie-images">
                {images.map((img, index) => (
                  <img key={index} src={`https://image.tmdb.org/t/p/w300${img.file_path}`} alt={`Backdrop ${index}`} className="extra-image" />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {(trailer || extraVideo) && (
        <div className="videos-container">

          {/* main trailer */}
          {trailer && (
            <div className="trailer-box">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* extra Video  */}
          {extraVideo && (
            <div className="trailer-box"> 
              <iframe
                src={`https://www.youtube.com/embed/${extraVideo.key}`}
                title={extraVideo.name} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}


      {/* the Cast */}
      <div className="movie-cast">
        <h2>Top Cast</h2>
        <div className="cast-list">
          {cast.slice(0, 20).map(actor => (
            <div className="cast-card" key={actor.cast_id}>
              <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/185x278?text=No+Image"} alt={actor.name} />
              <div>{actor.name}</div>
              <em>as {actor.character}</em>
            </div>
          ))}
        </div>
      </div>

      {/* similar movies  */}
      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <div className="similar-list">
          {similarMovies.slice(0, 10).map(similar => (
            <div className="similar-card" key={similar.id} onClick={() => navigate(`/movie/${similar.id}`)}>
              <img src={similar.poster_path ? `https://image.tmdb.org/t/p/w200${similar.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"} alt={similar.title} />
              <p>{similar.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;