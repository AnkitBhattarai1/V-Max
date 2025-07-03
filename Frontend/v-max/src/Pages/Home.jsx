// src/Pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopNavbar } from "./topnavbar";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo, fetchRecommendations } from "../Redux/VideoReducer/Action";
import {
  SimpleGrid,
  Box,
  Heading,
  Divider,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { VideoCard } from "../Components/VideoCard";

import home from "../Imges/Home.mp4";
import home1 from "../Imges/Home1.mp4";
import home2 from "../Imges/Home2.mp4";
import home3 from "../Imges/Home3.mp4";
import "./Home.css";

const videoFiles = [home, home1, home2, home3];

export const Home = () => {
  const dispatch        = useDispatch();
  const movies          = useSelector((s) => s.movieReducer.movies);
  const isLoading       = useSelector((s) => s.movieReducer.isLoading);
  const videosMap       = useSelector((s) => s.videoReducer.videos);
  const recommended     = useSelector((s) => s.videoReducer.recommendedvideos);
  const auth            = useSelector((s) => s.authReducer);

  // local UI state
  const [filtered,  setFiltered]  = useState([]);
  const [search,    setSearch]    = useState("");
  const [userId,    setUserId]    = useState(null);      // NEW
  const videoRefs                = useRef([]);

  /* ──────────────────────────────────────────────
     1.  Fetch all movies once
  ────────────────────────────────────────────── */
  useEffect(() => { dispatch(fetchallmovies()); }, [dispatch]);

  /* ──────────────────────────────────────────────
     2.  For every movie, fetch its video meta
  ────────────────────────────────────────────── */
  useEffect(() => {
    if (!movies?.length) return;
    movies.forEach(({ videoId }) => videoId && dispatch(getVideo(videoId)));
  }, [movies, dispatch]);

  /* ──────────────────────────────────────────────
     3.  Fetch self‑ID (like you did in VideoPlayerPage)
  ────────────────────────────────────────────── */
  useEffect(() => {
    const token = auth?.token || localStorage.getItem("jwtToken");
    if (!token) return;                    // user not logged in

    const fetchSelfId = async () => {
      try {
        const res = await fetch(
          "https://api.bhattaraiankit.com.np/user/selfId",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("selfId request failed");

        const raw = await res.text();
        let id;
        try { id = JSON.parse(raw).userId || JSON.parse(raw); }
        catch { id = raw; }

        if (id) {
          setUserId(id);                   // save locally
          dispatch(fetchRecommendations(id, 5)); // fire recs
        }
      } catch (err) {
        console.error("Could not fetch self‑ID:", err);
      }
    };

    fetchSelfId();
  }, [auth?.token, dispatch]);

  /* ──────────────────────────────────────────────
     4.  Combine movie + video data
  ────────────────────────────────────────────── */
  const combined =
    movies?.length
      ? movies.map((m) => {
          const v = videosMap[m.videoId] || {};
          return {
            id:         m.videoId     || "no‑id",
            title:      v.title       || m.title || "Untitled",
            thumbnailUrl:  v.thumbnailUrl || "https://via.placeholder.com/300x170?text=No+Thumbnail",
            duration:   v.duration    || "N/A",
            views:      v.views       || "N/A",
            uploadDate: v.uploadDate  || "N/A",
            category:   m.genres?.join(", ") || "Uncategorized",
          };
        })
      : [];

  /* ──────────────────────────────────────────────
     5.  Filter on search term
  ────────────────────────────────────────────── */
  useEffect(() => {
    if (!search) setFiltered(combined);
    else         setFiltered(
      combined.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [combined, search]);

  /* ──────────────────────────────────────────────
     6.  Helpers
  ────────────────────────────────────────────── */
  const handleVideoEnd = (i) => {
    const nxt = i + 1;
    if (nxt < videoRefs.current.length) {
      videoRefs.current[nxt].parentElement.scrollIntoView({ behavior: "smooth" });
      videoRefs.current[nxt].play();
    }
  };

  /* ──────────────────────────────────────────────
     7.  Loading splash
  ────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <Center h="100vh" ml="200px">
        <CircularProgress isIndeterminate color="blue.400" />
      </Center>
    );
  }

  return (
    <>
      <TopNavbar onSearch={setSearch} />

      <Box ml="190px" pt="30px" px={4} width="calc(110% - 250px)">
        {/* HERO – welcome loops */}
        {!search && (
          <div className="video-section">
            <div style={{ display: "flex", gap: "1rem" }}>
              {videoFiles.map((src, i) => (
                <div key={i} className="video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={src}
                    className="video-element"
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => handleVideoEnd(i)}
                  />
                  <div className="video-text">
                    <div>Welcome to V‑MAX,</div>
                    <div>Your Ultimate Video Partner</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {!search && recommended?.length > 0 && (
          <Box mb={6} className="recommendation-section">
            <Heading size="md" mb={4}>Recommended For You</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {recommended.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </SimpleGrid>
            <Divider my={4} />
          </Box>
        )}

        {/* ALL MOVIES */}
        <div className="video-card-container">
          <Heading size="md" mb={4}>Movies</Heading>
          {filtered.length ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filtered.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center">No videos found.</Box>
          )}
        </div>
      </Box>
    </>
  );
};
