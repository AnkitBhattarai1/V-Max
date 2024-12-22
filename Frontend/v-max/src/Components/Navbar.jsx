import React from "react";
import "../Styles/Navbar.css"; // Import the corresponding CSS

const Navbar = () => {
  return (
    <div className="navbar">
      {/* V-MAX logo on the left */}
      <div className="logo">V-MAX</div>

      {/* Navigation links centered */}
      <div className="links">
        <a href="/">Home</a>
        <a href="/movies">Movies</a>
        <a href="/tvshows">TV Shows</a>
        <a href="/mylist">My List</a>
      </div>
    </div>
  );
};

export default Navbar;
