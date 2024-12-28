import React from "react";

const MoviesContainer = ({ searchTerm, filteredMovies, title, className, cardClass }) => {
  return (
    <section className="section">
      <h1 className="section-title">{title}</h1>
      <div className={`grid ${className}`}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className={`card ${cardClass}`}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="poster"
              />
              <h3 className="title">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </section>
  );
};

export default MoviesContainer;
