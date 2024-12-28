import React, { useState } from "react";
import Navbar from "../Components/Navbar"; // Import Navbar component
import MoviesContainer from "../Components/MoviesContainer"; // Import MoviesContainer component
import "../Styles/HomePage.css" // Import the HomePage CSS
import "../Styles/MoviesContainer.css"; // Import the MoviesContainer CSS
import { Routes, Route } from "react-router-dom"; // Import Routes and Route correctly

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

  // Movie and TV show data
  const movies = [
    { id: 1, title: "Sonic the Hedgehog 3", posterUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Dirty Angels", posterUrl: "https://via.placeholder.com/150" },
    { id: 3, title: "Elevation", posterUrl: "https://via.placeholder.com/150" },
    { id: 4, title: "Absolution", posterUrl: "https://via.placeholder.com/150" },
    { id: 5, title: "Kraven the Hunter", posterUrl: "https://via.placeholder.com/150" }
  ];

  const tvShows = [
    { id: 1, title: "Stranger Things", posterUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Breaking Bad", posterUrl: "https://via.placeholder.com/150" },
    { id: 3, title: "The Mandalorian", posterUrl: "https://via.placeholder.com/150" }
  ];

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter movies and TV shows based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTvShows = tvShows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      <Navbar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="content">
        <Routes> {/* Correctly imported Routes */}
          <Route
            path="/" // Set root path
            element={
              <MoviesContainer
                searchTerm={searchTerm}
                filteredMovies={filteredMovies}
                title="Trending Movies"
                className="movie-grid"
                cardClass="movie-card"
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
