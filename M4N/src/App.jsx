import React from "react";
import { createRoot } from "react-dom/client";
import AwardsPage from "./pages/AwardsPage.jsx";

// Select the root element in the HTML
const root = createRoot(document.getElementById("root"));

// Render the main AwardsPage component
root.render(<AwardsPage />);