import React from "react";
import { Link } from "react-router-dom";

export const VideoCard = ({ video }) => (
  <Link
    to={`/video/${video.id}`}
    style={{
      textDecoration: "none",
      cursor: "pointer",
      display: "inline-block",
      margin: "10px",
    }}
  >
    <div
      style={{
        width: "300px",
        border: "1px solid #ccc",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={{ width: "100%", height: "170px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://dummyimage.com/300x170/000/fff&text=No+Image";
        }}
      />
      <h3 style={{ color: "#fff", padding: "8px" }}>{video.title}</h3>
    </div>
  </Link>
);
