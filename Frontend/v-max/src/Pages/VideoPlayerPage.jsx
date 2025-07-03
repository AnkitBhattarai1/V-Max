import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  Divider,
  Button,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { streamVideo, getThumbnail } from "../Services/VideoService";
import { submitRating } from "../Services/RatingandRecommendation";
import "./VideoPlayerPage.css";

export const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const movies = useSelector((state) => state.movieReducer.movies);
  const videosMap = useSelector((state) => state.videoReducer.videos);
  const auth = useSelector((state) => state.authReducer);

 const movie = movies.find((m) => m.videoId === videoId) || {};
  const video = videosMap[videoId];

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const blob = await streamVideo(videoId);
        setVideoUrl(URL.createObjectURL(blob));
      } catch {
        console.error("Failed to stream video");
      }

      try {
        const thumbBlob = await getThumbnail(videoId);
        setPosterUrl(URL.createObjectURL(thumbBlob));
      } catch {
        console.warn("Thumbnail not found.");
        setPosterUrl("https://dummyimage.com/640x360/000/fff&text=No+Thumbnail");
      }
    };

    if (videoId) fetchVideoData();
  }, [videoId]);

  const handleRatingSubmit = async () => {
    try {
      const token = auth?.token || localStorage.getItem("jwtToken");

      if (!token) {
        setMessage("You must be logged in to rate.");
        return;
      }

      const userIdRes = await fetch("https://api.bhattaraiankit.com.np/user/selfId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userIdRes.ok) {
        throw new Error("Failed to fetch user ID");
      }

      const rawText = await userIdRes.text();
      console.log("Raw /selfId response:", rawText);

      let userId;
      try {
        const json = JSON.parse(rawText);
        userId = json.userId || json;
      } catch {
        userId = rawText;
      }

      if (!userId) {
        throw new Error("User ID not found");
      }

      await submitRating({
        userId,
        videoId,
        rating: parseFloat(rating),
        review,
      });

      setMessage("Rating submitted successfully!");
      setReview("");
    } catch (err) {
      console.error("Rating submission error:", err);
      setMessage("Failed to submit rating.");
    }
  };

  if (!video) {
    return (
      <Box className="video-player-container">
        <Text fontSize="xl" color="red.500">
          Video or Movie not found.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="video-player-container">
      <Box mb={6}>
        <video controls src={videoUrl} poster={posterUrl}>
          Sorry, your browser doesn't support embedded videos.
        </video>
      </Box>

      <VStack align="start" spacing={4} className="video-metadata">
        <Heading size="lg">{video.title || movie.title}</Heading>
        <Text>
          {movie.description || video.description || "No description available."}
        </Text>

        <HStack spacing={2} wrap="wrap">
          {movie.genres?.length > 0 ? (
            movie.genres.map((g) => (
              <Tag key={g} colorScheme="teal" variant="subtle">
                {g}
              </Tag>
            ))
          ) : (
            <Tag colorScheme="gray" variant="subtle">
              No genres
            </Tag>
          )}
        </HStack>

        <Divider />
        <Text>
          <strong>Cast:</strong> {movie.cast || "N/A"}
        </Text>
        <Text>
          <strong>Director:</strong> {movie.director || "N/A"}
        </Text>
        <Text>
          <strong>Release Date:</strong> {video.releaseDate || "N/A"}
        </Text>
        <Text>
          <strong>Runtime:</strong> {video.duration || "N/A"} minutes
        </Text>
        <Text>
          <strong>Language:</strong> {video.language || "N/A"}
        </Text>
        <Text>
          <strong>Age Rating:</strong> {video.ageRating || "N/A"}
        </Text>

        <Divider />
        <Heading size="md" mt={4}>
          Rate this Movie
        </Heading>
        <HStack spacing={4} mt={2}>
          <Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            width="100px"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
            width="400px"
            size="sm"
          />
          <Button onClick={handleRatingSubmit} colorScheme="teal">
            Submit
          </Button>
        </HStack>
        {message && (
          <Text mt={2} color={message.includes("Failed") ? "red.500" : "green.500"}>
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
