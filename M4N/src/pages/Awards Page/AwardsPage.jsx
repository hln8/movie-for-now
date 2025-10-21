import React, { useState, useEffect } from "react";
import HeroSection from "../../components/Hero Section/HeroSection.jsx";
import YearSelector from "../../components/Year Selector/YearSelector.jsx";
import CategorySelector from "../../components/Category Selector/CategorySelector.jsx";
import NomineesList from "../../components/Nominees List/NomineesList.jsx";

function AwardsPage() {
  // State variables
  const [selectedYear, setSelectedYear] = useState(""); // Currently selected year
  const [nominees, setNominees] = useState([]); // Nominees for the selected year
  const [categories, setCategories] = useState([]); // Available categories for the year
  const [selectedCategory, setSelectedCategory] = useState("all"); // Currently selected category filter
  const [showNominees, setShowNominees] = useState(false); // Controls display of nominees
  const [loading, setLoading] = useState(false); // Loading state while fetching data

  // Handle year selection from YearSelector component
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setShowNominees(true); // Trigger nominees display
  };

  // Fetch nominees from local JSON when a year is selected
  useEffect(() => {
    if (!showNominees || !selectedYear) return;

    async function fetchNominees() {
      setLoading(true);
      try {
        const res = await fetch("/AcademyAwards.json"); // Fetch local JSON
        const data = await res.json();

        // Filter entries matching the selected year and valid category
        const yearData = data.filter(
          (award) =>
            award.year &&
            award.category &&
            award.year.toString() === selectedYear.toString()
        );

        if (yearData.length === 0) {
          setNominees([]);
          setCategories([]);
          setLoading(false);
          return;
        }

        // Group nominees by category
        const categoriesData = yearData.reduce((acc, item) => {
          const existingCategory = acc.find(
            (c) => c.category === item.category
          );

          // Parse names if stored as string, otherwise use array
          let names = [];
          if (item.names) {
            if (typeof item.names === "string") {
              try {
                names = JSON.parse(item.names);
              } catch {
                names = [];
              }
            } else if (Array.isArray(item.names)) {
              names = item.names;
            }
          }

          // Build nominee object
          const nomineeData = {
            title: item.title || "",
            img: item.img || "",
            tmdb: item.tmdb || null,
            isWinner:
              (typeof item.isWinner === "string" &&
                item.isWinner.toUpperCase() === "TRUE") ||
              item.isWinner === true,
            names: names.map((n) => ({
              name: n.name,
              tmdb: n.tmdb,
              img: n.img,
            })),
          };

          // Add nominee to category or create new category
          if (existingCategory) {
            existingCategory.items.push(nomineeData);
          } else {
            acc.push({ category: item.category, items: [nomineeData] });
          }
          return acc;
        }, []);

        setNominees(categoriesData);
        setCategories(categoriesData.map((c) => c.category));
      } catch (err) {
        console.error("Error fetching nominees:", err);
        setNominees([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNominees();
  }, [selectedYear, showNominees]);

  // Filter nominees based on selected category
  const filteredNominees =
    selectedCategory === "all"
      ? nominees
      : nominees.filter((c) => c.category === selectedCategory);

  return (
    <div className="awards-page">
      <HeroSection />

      {/* Year selection component */}
      <YearSelector onYearChange={handleYearChange} />

      {/* Show nominees if a year is selected */}
      {showNominees && (
        <>
          {loading ? (
            // Loading message
            <p
              style={{
                textAlign: "center",
                color: "#f3e03b",
                fontSize: "1.5rem",
              }}
            >
              Loading nominees...
            </p>
          ) : (
            <>
              {/* Category filter */}
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Display nominees for the selected year and category */}
              <NomineesList year={selectedYear} nominees={filteredNominees} />
            </>
          )}
        </>
      )}
    </div>
  );
}
export default AwardsPage