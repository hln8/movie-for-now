import React from "react";
import oscarsImage from "../assets/oscars2.png";
import "./HeroSection.css"

const HeroSection = () => {
    return(
        <div className="container">
            <img src={oscarsImage} alt="Oscar Awards Picture" />
            <div className="hero-text">
                <h1>Oscar Awards</h1>
                <p>Celebrating the Best in Cinema</p>
            </div>
        </div>
    );
};

export default HeroSection;