import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  FormLabel,
  Select
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addVideo } from '../Redux/VideoReducer/Action';
import { addmovie } from '../Redux/MovieReducer/Action';

export const AdminMovieManager = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    genres: '',
    metaData: '',
    runtime: '',
    ageRating: '',
    language: '',
    releaseDate: ''
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [movieMeta, setMovieMeta] = useState({ cast: '', director: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoForm({ ...videoForm, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'video') setVideoFile(files[0]);
    else if (name === 'thumbnail') setThumbnailFile(files[0]);
  };

  const handleMovieMetaChange = (e) => {
    const { name, value } = e.target;
    setMovieMeta({ ...movieMeta, [name]: value });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    if (!videoFile || !thumbnailFile) {
      toast({
        title: 'Please upload both video and thumbnail.',
        status: 'warning',
        position: 'top'
      });
      return;
    }

    const formattedReleaseDate = formatDate(videoForm.releaseDate);

    const videoMetadata = {
      title: videoForm.title,
      description: videoForm.description,
      trailerUrl: '',
      releaseDate: formattedReleaseDate,
      duration: videoForm.runtime,
      videoType: 'MOVIE',
      ageRating: videoForm.ageRating,
      language: videoForm.language,
      metadata: '{}'
    };

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(videoMetadata)], {
        type: 'application/json'
      })
    );
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      const videoRes = await dispatch(addVideo(formData));
      const videoId = videoRes.id;

      await dispatch(
        addmovie({
          Video_id: videoId,
          cast: movieMeta.cast,
          director: movieMeta.director,
          genres: videoForm.genres
            .split(',')
            .map((g) => g.trim())
            .filter(Boolean),
          metaData: videoForm.metaData
        })
      );

      toast({
        title: 'Movie and video uploaded successfully!',
        status: 'success',
        position: 'top'
      });

      // Reset form
      setVideoForm({
        title: '',
        description: '',
        genres: '',
        metaData: '',
        runtime: '',
        ageRating: '',
        language: '',
        releaseDate: ''
      });
      setMovieMeta({ cast: '', director: '' });
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      toast({
        title: 'Error uploading movie',
        status: 'error',
        position: 'top'
      });
      console.error(error);
    }
  };

  return (
    <VStack
      spacing={4}
      p={4}
      border="1px solid gray"
      borderRadius="md"
      width="100%"
    >
      <Text fontWeight="bold" color="teal.300">
        Add Movie (Full Metadata)
      </Text>

      <Input
        name="title"
        placeholder="Title"
        value={videoForm.title}
        onChange={handleInputChange}
      />
      <Input
        name="description"
        placeholder="Description"
        value={videoForm.description}
        onChange={handleInputChange}
      />
      <Input
        name="genres"
        placeholder="Genres (comma-separated)"
        value={videoForm.genres}
        onChange={handleInputChange}
      />
      <Input
        name="metaData"
        placeholder="MetaData"
        value={videoForm.metaData}
        onChange={handleInputChange}
      />
      <Input
        name="runtime"
        placeholder="Runtime (minutes)"
        value={videoForm.runtime}
        onChange={handleInputChange}
      />

      <Select
        name="ageRating"
        placeholder="Select Age Rating"
        value={videoForm.ageRating}
        onChange={handleInputChange}
      >
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NC-17">NC-17</option>
      </Select>

      <Input
        name="language"
        placeholder="Language"
        value={videoForm.language}
        onChange={handleInputChange}
      />
      <Input
        type="date"
        name="releaseDate"
        value={videoForm.releaseDate}
        onChange={handleInputChange}
      />

      <FormLabel>Video File</FormLabel>
      <Input
        type="file"
        name="video"
        accept="video/*"
        onChange={handleFileChange}
      />

      <FormLabel>Thumbnail</FormLabel>
      <Input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Input
        name="cast"
        placeholder="Cast"
        value={movieMeta.cast}
        onChange={handleMovieMetaChange}
      />
      <Input
        name="director"
        placeholder="Director"
        value={movieMeta.director}
        onChange={handleMovieMetaChange}
      />

      <Button colorScheme="blue" onClick={handleSubmit}>
        Upload Movie
      </Button>
    </VStack>
  );
};
