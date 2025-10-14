import { useState, useEffect } from "react";
import "./YearSelector.css";

const YearSelector = ({ onYearChange }) => {
  // ---------------- STATE ----------------
  const [year, setYear] = useState("");   // currently selected year
  const [years, setYears] = useState([]); // all available years from dataset

  // ---------------- HANDLERS ----------------
  // Update selected year when user changes dropdown
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  // ---------------- DATA FETCH ----------------
  // On mount: fetch Academy Awards data and extract all unique years
  useEffect(() => {
    async function fetchYears() {
      try {
        // Load the JSON dataset from public folder
        const res = await fetch("/AcademyAwards.json");
        const data = await res.json();

        // Extract unique years, convert to strings, sort newest → oldest
        const allYears = Array.from(
          new Set(data.map((award) => award.year.toString()))
        ).sort((a, b) => b - a);

        setYears(allYears);                // populate dropdown
        if (allYears.length > 0) {
          setYear(allYears[0]);            // default to latest year
        }
      } catch (err) {
        console.error("Error loading years:", err);
      }
    }
    fetchYears();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <div className="year-selector-container">
      {/* Heading updates with current selection */}
      <h2 className="year-selector-title">Select Oscar {year}</h2>
      <p className="year-selector-instructions">
        Select a year to view nominees:
      </p>

      {/* Dropdown with all available years */}
      <select className="year-selector" value={year} onChange={handleChange}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Action button triggers parent callback with selected year */}
      <button
        className="view-nominees-button"
        onClick={() => onYearChange(year)}
      >
        View {year} Nominees
      </button>
    </div>
  );
};

export default YearSelector;
