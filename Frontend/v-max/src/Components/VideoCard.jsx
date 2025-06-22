import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  const [favorite, setFavorite] = useState(false);
  const handleFavorite = (e) => {
    e.preventDefault();
    setFavorite((prev) => !prev);
    // Optionally, send favorite status to backend here
  };
  return (
    <div className="video-card">
      <div className="video-card-thumb-container">
        <img
          className="video-card-thumb"
          src={video.thumbnailUrl}
          alt={video.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://dummyimage.com/300x170/000/fff&text=No+Image";
          }}
        />
        <button
          className={`favorite-btn${favorite ? " active" : ""}`}
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={favorite ? "#e74c3c" : "none"} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
      <div className="video-card-info">
        <h3 className="video-card-title">{video.title}</h3>
        <Link to={`/video/${video.id}`} className="watch-now-link">
          <button className="watch-now-btn">Watch Now</button>
        </Link>
      </div>
    </div>
  );
}
