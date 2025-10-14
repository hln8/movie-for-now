import React, { useState, useEffect } from "react";
import "./CategorySelector.css";

const CategorySelector = ({
    categories = [], // List of categories passed in from the parent page
    selectedCategory = "all", // Default selected category
    onCategoryChange, // Function from parent to update nominees list
}) => {
    const [category, setCategory] = useState(selectedCategory || "all");

    // Sync dropdown with the parent page whenever the parent changes
    useEffect(() => {
        setCategory(selectedCategory || "all");
    }, [selectedCategory]);

    // Update the chosen category when user picks from dropdown
    const handleChange = (e) => setCategory(e.target.value);

    return (
        <div className="category-selector-container">
            {/* Title + instructions above dropdown */}
            <h2 className="category-selector-title">Oscar Categories</h2>
            <p className="category-selector-instructions">
                Select a category to view nominees:
            </p>

            {/* Dropdown menu with "All Categories" and each category */}
            <select
                className="category-selector"
                value={category}
                onChange={handleChange}
            >
                <option value="all">All Categories</option>
                {categories.map((c, idx) => (
                    <option key={idx} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            {/* Button → tells parent page to show nominees for chosen category */}
            <button
                className="view-category-button"
                onClick={() => onCategoryChange(category)}
                disabled={!category}
            >
                View {category === "all" ? "All Categories" : category}
            </button>
        </div>
    );
};

export default CategorySelector;
