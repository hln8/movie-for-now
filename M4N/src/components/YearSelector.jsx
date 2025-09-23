import React, { useState } from "react";

// Dropdown selector for Oscar years (1928 → current year)
const YearSelector = ({ onYearChange }) => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically
    const [year, setYear] = useState(currentYear.toString()); // Default year = current year

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className="year-selector-container">
            {/* Section heading reflects the currently selected year */}
            <h2 className="year-selector-title">Select Oscar {year}</h2>
            <p className="year-selector-instructions">Select a year to view nominees:</p>
            
            {/* Dynamic dropdown: generates years in reverse (current year → 1928) */}
            <select 
                className="year-selector" 
                value={year} 
                onChange={handleChange}
            >
                {Array.from({ length: currentYear - 1928 + 1 }, (_, i) => {
                    const y = currentYear - i;
                    return <option key={y} value={y}>{y}</option>;
                })}
            </select>

            {/* Action button triggers callback with the chosen year */}
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
