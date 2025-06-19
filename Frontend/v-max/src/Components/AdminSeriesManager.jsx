import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { addVideo } from '../Redux/VideoReducer/Action';
import { addSeries, fetchAllSeries } from '../Redux/SeriesReducer/Action';
import { addSeason, fetchallseasons } from '../Redux/SeasonReducer/Action';
import { addEpisode } from '../Redux/EpisodeReducer/Action';

export const AdminSeriesManager = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [series, setSeries] = useState({ title: '', description: '', genres: '', metaData: '' });
  const [season, setSeason] = useState({ seriesId: '', seasonNumber: '', releaseDate: '', metadata: '', genres: '' });
  const [episodeForm, setEpisodeForm] = useState({
    seasonId: '',
    title: '',
    description: '',
    genres: '',
    metaData: '',
    runtime: '',
    ageRating: '',
    language: '',
    releaseDate: '',
    episodeNumber: ''
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const seriesList = useSelector((state) => state.seriesReducer.seriesList);
  const seasonList = useSelector((state) => state.seasonReducer.seasonList);

  useEffect(() => {
    dispatch(fetchAllSeries());
    dispatch(fetchallseasons());
  }, [dispatch]);

  const handleSeriesChange = (e) => setSeries({ ...series, [e.target.name]: e.target.value });
  const handleSeasonChange = (e) => setSeason({ ...season, [e.target.name]: e.target.value });
  const handleEpisodeChange = (e) => setEpisodeForm({ ...episodeForm, [e.target.name]: e.target.value });

  const handleEpisodeFiles = (e) => {
    const { name, files } = e.target;
    if (name === 'video') setVideoFile(files[0]);
    if (name === 'thumbnail') setThumbnailFile(files[0]);
  };

  const handleAddSeries = async () => {
    const payload = {
      ...series,
      genres: series.genres.split(',').map((g) => g.trim())
    };
    await dispatch(addSeries(payload));
    toast({ title: 'Series added', status: 'success', position: 'top' });
    dispatch(fetchAllSeries());
    setSeries({ title: '', description: '', genres: '', metaData: '' });
  };

  const handleAddSeason = async () => {
    const payload = {
      ...season,
      seriesId: season.seriesId,
      genres: season.genres.split(',').map((g) => g.trim()),
      seasonNumber: +season.seasonNumber
    };
    await dispatch(addSeason(payload));
    toast({ title: 'Season added', status: 'success', position: 'top' });
    dispatch(fetchallseasons());
    setSeason({ seriesId: '', seasonNumber: '', releaseDate: '', metadata: '', genres: '' });
  };

  const handleAddEpisode = async () => {
    if (!videoFile || !thumbnailFile || !episodeForm.seasonId) {
      toast({ title: 'Fill all fields and upload files.', status: 'error' });
      return;
    }

    const videoMetadata = {
      title: episodeForm.title,
      description: episodeForm.description,
      trailerUrl: '',
      releaseDate: episodeForm.releaseDate,
      duration: episodeForm.runtime,
      videoType: 'EPISODE',
      ageRating: episodeForm.ageRating,
      language: episodeForm.language,
      metadata: '{}'
    };

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(videoMetadata)], { type: 'application/json' })
    );
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      const videoRes = await dispatch(addVideo(formData));
      const videoId = videoRes.id;

      if (!videoId) {
        toast({ title: 'Video upload failed', status: 'error' });
        return;
      }

      const payload = {
        seasonId: episodeForm.seasonId,
        videoId,
        episodeNumber: +episodeForm.episodeNumber,
        releaseDate: episodeForm.releaseDate
      };

      await dispatch(addEpisode(payload));
      toast({ title: 'Episode uploaded!', status: 'success' });

      setEpisodeForm({
        seasonId: '',
        title: '',
        description: '',
        genres: '',
        metaData: '',
        runtime: '',
        ageRating: '',
        language: '',
        releaseDate: '',
        episodeNumber: ''
      });
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      toast({ title: 'Error uploading episode', status: 'error' });
      console.error(error);
    }
  };

  return (
    <VStack spacing={8} p={4} width="100%">
      {/* Add Series */}
      <Box w="100%">
        <Text fontWeight="bold" color="teal.300">Add Series</Text>
        <Input name="title" placeholder="Title" value={series.title} onChange={handleSeriesChange} />
        <Input name="description" placeholder="Description" value={series.description} onChange={handleSeriesChange} />
        <Input name="genres" placeholder="Genres (comma-separated)" value={series.genres} onChange={handleSeriesChange} />
        <Input name="metaData" placeholder="MetaData" value={series.metaData} onChange={handleSeriesChange} />
        <Button colorScheme="green" onClick={handleAddSeries}>Add Series</Button>
      </Box>

      {/* Add Season */}
      <Box w="100%">
        <Text fontWeight="bold" color="teal.300">Add Season</Text>
        <Select name="seriesId" placeholder="Select Series" value={season.seriesId} onChange={handleSeasonChange}>
          {seriesList.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </Select>
        <Input name="seasonNumber" placeholder="Season Number" value={season.seasonNumber} onChange={handleSeasonChange} />
        <Input name="releaseDate" placeholder="Release Date (YYYY-MM-DD)" value={season.releaseDate} onChange={handleSeasonChange} />
        <Input name="metadata" placeholder="Metadata" value={season.metadata} onChange={handleSeasonChange} />
        <Input name="genres" placeholder="Genres (comma-separated)" value={season.genres} onChange={handleSeasonChange} />
        <Button colorScheme="purple" onClick={handleAddSeason}>Add Season</Button>
      </Box>

      {/* Add Episode */}
      <Box w="100%">
        <Text fontWeight="bold" color="teal.300">Add Episode</Text>
        <Select name="seasonId" placeholder="Select Season" value={episodeForm.seasonId} onChange={handleEpisodeChange}>
          {seasonList.map(season => (
            <option key={season.id} value={season.id}>
              {season.seasonNumber} - {season.series?.title || 'Unknown Series'}
            </option>
          ))}
        </Select>
        <Input name="title" placeholder="Title" value={episodeForm.title} onChange={handleEpisodeChange} />
        <Input name="description" placeholder="Description" value={episodeForm.description} onChange={handleEpisodeChange} />
        <Input name="genres" placeholder="Genres (comma-separated)" value={episodeForm.genres} onChange={handleEpisodeChange} />
        <Input name="metaData" placeholder="MetaData" value={episodeForm.metaData} onChange={handleEpisodeChange} />
        <Input name="runtime" placeholder="Runtime (minutes)" value={episodeForm.runtime} onChange={handleEpisodeChange} />
        <Select name="ageRating" placeholder="Select Age Rating" value={episodeForm.ageRating} onChange={handleEpisodeChange}>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </Select>
        <Input name="language" placeholder="Language" value={episodeForm.language} onChange={handleEpisodeChange} />
        <Input type="date" name="releaseDate" value={episodeForm.releaseDate} onChange={handleEpisodeChange} />
        <Input name="episodeNumber" placeholder="Episode Number" value={episodeForm.episodeNumber} onChange={handleEpisodeChange} />
        <FormLabel>Video File</FormLabel>
        <Input type="file" name="video" accept="video/*" onChange={handleEpisodeFiles} />
        <FormLabel>Thumbnail</FormLabel>
        <Input type="file" name="thumbnail" accept="image/*" onChange={handleEpisodeFiles} />
        <Button colorScheme="orange" onClick={handleAddEpisode}>Add Episode</Button>
      </Box>
    </VStack>
  );
};
