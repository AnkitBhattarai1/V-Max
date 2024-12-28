import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"; 

const Navbar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="navbar">
      <div className="logo">V-MAX</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for movies or TV shows..."
          value={searchTerm} // Bind the value of input to searchTerm
          onChange={handleSearch} // Update the searchTerm when user types
        />
      </div>
    </div>
  );
};

export default Navbar;
