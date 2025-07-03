import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getThumbnail } from "../Services/VideoService";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  const [favorite, setFavorite] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const blob = await getThumbnail(video.id);
        const url = URL.createObjectURL(blob);
        setThumbnailUrl(url);
      } catch (err) {
        console.error("Thumbnail fetch failed", err);
        setThumbnailUrl("https://dummyimage.com/300x170/000/fff&text=No+Image");
      }
    };

    fetchThumbnail();
  }, [video.id]);

  const handleFavorite = (e) => {
    e.preventDefault();
    setFavorite((prev) => !prev);
    // Send to backend if needed
  };

  return (
    <div className="video-card">
      <div className="video-card-thumb-container">
        <img className="video-card-thumb" src={thumbnailUrl} alt={video.title} />
        <button
          className={`favorite-btn${favorite ? " active" : ""}`}
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          ❤️
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
};
