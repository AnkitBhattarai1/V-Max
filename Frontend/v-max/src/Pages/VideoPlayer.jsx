
import React, { useRef, useState } from "react";
import {
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";

export const VideoPlayer = ({ videoUrl, posterUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Full volume by default
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const isCurrentlyMuted = videoRef.current.muted;
    videoRef.current.muted = !isCurrentlyMuted;
    setIsMuted(!isCurrentlyMuted);
  };

  const handleVolumeChange = (value) => {
    videoRef.current.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const handleProgress = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (value) => {
    const duration = videoRef.current.duration;
    videoRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <Box
      as="section"
      width="100%"
      maxWidth="900px" // Matches parent container
      mx="auto"
      bg={useColorModeValue("gray.800", "gray.700")}
      border="1px solid gray"
      borderRadius="md"
      boxShadow="lg"
      p={4}
    >
      {/* Video Player */}
      <Box width="100%" overflow="hidden" borderRadius="md">
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          poster={posterUrl}
          onTimeUpdate={handleProgress}
          onEnded={() => setIsPlaying(false)}
          controls={false}
          style={{ display: "block", maxWidth: "100%" }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Controls */}
      <VStack mt={4} spacing={4}>
        <Slider
          aria-label="Video Progress"
          value={progress}
          onChange={handleSeek}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Stack direction="row" justifyContent="space-between" alignItems="center" w="100%">
          <IconButton
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            colorScheme="teal"
          />

          <Stack direction="row" alignItems="center">
            <IconButton
              icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              colorScheme="teal"
            />
            <Slider
              aria-label="Volume"
              value={volume}
              min={0}
              max={1}
              step={0.1}
              onChange={handleVolumeChange}
              width="150px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Stack>

          <IconButton
            icon={<FaExpand />}
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            colorScheme="teal"
          />
        </Stack>
      </VStack>
    </Box>
  );
};
