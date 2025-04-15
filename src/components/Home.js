import React from "react";
import Navbar from "./Navbar";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        <h1 className="home-title">Junior Cybersecurity Analyst</h1>
      </div>
    </div>
  );
};

export default Home;
