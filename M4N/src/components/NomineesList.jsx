import React, { useEffect, useState } from "react";
import "./NomineesList.css";

// Default fallback images
const defaultOscar =
  "https://icons8.com/icon/oFmUQxKr0y0h/movie"; // fallback movie poster
const defaultPerson =
  "https://img.icons8.com/ios-filled/150/CCCCCC/user-male-circle.png"; // fallback avatar

const TMDB_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for TMDb images
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TMDb API key from environment

export default function NomineesList({ year, nominees }) {
  const [data, setData] = useState([]); // Holds nominees enriched with images
  const [loadingImages, setLoadingImages] = useState(false); // Show loading state

  // Fetch actor images from TMDb if missing
  useEffect(() => {
    async function enrichActors() {
      if (!nominees || nominees.length === 0) return;
      setLoadingImages(true);

      try {
        const updated = await Promise.all(
          nominees.map(async (category) => {
            const items = await Promise.all(
              category.items.map(async (nominee) => {
                const namesWithImages = await Promise.all(
                  (nominee.names || []).map(async (person) => {
                    // If person has no image but has TMDb ID, fetch from TMDb
                    if (!person.img && person.tmdb) {
                      try {
                        const res = await fetch(
                          `https://api.themoviedb.org/3/person/${person.tmdb}?api_key=${API_KEY}`
                            );
                        const data = await res.json();
                        if (data.profile_path) {
                          return { ...person, img: data.profile_path };
                        }
                      } catch (err) {
                        console.error("TMDb fetch error:", err);
                      }
                    }
                    return person; // Return original if no image found
                  })
                );

                return { ...nominee, names: namesWithImages }; // Add enriched names
              })
            );

            return { ...category, items }; // Add enriched items to category
          })
        );

        setData(updated); // Save enriched data
      } catch (err) {
        console.error("Error enriching nominees:", err);
        setData(nominees); // Fallback to original data if error occurs
      } finally {
        setLoadingImages(false); // Stop loading state
      }
    }

    enrichActors();
  }, [nominees]);

  // Show loading message while fetching images
  if (loadingImages) {
    return (
      <p style={{ textAlign: "center" }}>Loading nominees for {year}...</p>
    );
  }

  // Show fallback message if no nominees
  if (!nominees || nominees.length === 0) {
    return <p style={{ textAlign: "center" }}>No nominees available for {year}</p>;
  }

  return (
    <div className="nominees-section">
      {/* Year heading */}
      <h2 className="year-title">Nominees for {year}</h2>
      
      {/* Loop through each category */}
      {data.map((category, idx) => (
        <div key={idx} className="category-block">
          {/* Category title */}
          <h3 className="category-title">{category.category}</h3>

          {/* Grid of nominees */}
          <div className="nominees-grid">
            {category.items.map((nominee, i) => {
              const posterSrc = nominee.img
                ? `${TMDB_BASE_URL}${nominee.img}`
                : defaultOscar; // Fallback poster

              return (
                <div
                  key={i}
                  className={`nominee-card ${nominee.isWinner ? "winner" : ""}`} // Highlight winner
                >
                  {/* Winner badge */}
                  {nominee.isWinner && 
                    <div className="winner-badge">WINNER</div>}

                  {/* Movie poster */}
                  <img
                    src={posterSrc}
                    alt="Movie poster"
                    className="nominee-poster"
                    onError={(e) => (e.currentTarget.src = defaultOscar)} // fallback on error
                  />
                  <h4>{nominee.title || "No Title"}</h4>

                  {/* List of people (actors/directors/etc.) */}
                  <div className="people-list">
                    {(nominee.names || []).map((person, j) => {
                      const personSrc = person?.img
                        ? `${TMDB_BASE_URL}${person.img}`
                        : defaultPerson; // fallback avatar

                      return (
                        <div key={j} className="person">
                          <img
                            src={personSrc}
                            alt="Profile avatar"
                            className="person-photo"
                            onError={(e) => (e.currentTarget.src = defaultPerson)}
                          />
                          <p className="person-name">{person?.name || "No Name"}</p>
                        </div>
                      );
                    })}
                    {/* Message if no people listed */}
                    {(nominee.names || []).length === 0 && <p>No people listed</p>}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
      ))}
    </div>
  );
}