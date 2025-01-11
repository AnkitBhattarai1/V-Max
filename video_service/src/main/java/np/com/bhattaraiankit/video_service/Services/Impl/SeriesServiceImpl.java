package np.com.bhattaraiankit.video_service.Services.Impl;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeriesRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeriesResponse;
import np.com.bhattaraiankit.video_service.Models.Genre;
import np.com.bhattaraiankit.video_service.Models.Series;
import np.com.bhattaraiankit.video_service.Repository.GenreRepo;
import np.com.bhattaraiankit.video_service.Repository.SeriesRepo;
import np.com.bhattaraiankit.video_service.Services.SeriesService;

@Service
public class SeriesServiceImpl implements SeriesService {

    private final SeriesRepo seriesRepo;
    private final GenreRepo genreRepo;

    public SeriesServiceImpl(SeriesRepo seriesRepo, GenreRepo genreRepo) {
        this.seriesRepo = seriesRepo;
        this.genreRepo = genreRepo;
    }

    @Override
    public SeriesResponse getSeriesById(String id) {
        Series series = seriesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Series not found"));
        return SeriesResponse.fromEntity(series);
    }

    @Override
    public List<SeriesResponse> getAllSeries() {
        return seriesRepo.findAll()
                .stream()
                .map(SeriesResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public SeriesResponse createSeries(CreateSeriesRequest request) {
        Series series = new Series();

        series.setTitle(request.title());
        series.setDescription(request.description());
        series.setOngoing(true); //late to be made from request no it is automatically true;
//        series.setThumbnailUrl(request.thumbnailUrl());
 //       series.setMetadata(request.metadata());

        List<Genre> genres = request.genres()
                .stream()
                .map(name -> genreRepo.findByName(name).orElseGet(() -> genreRepo.save(new Genre(name))))
                .collect(Collectors.toList());

        series.setGenre(genres);
        series.setTotalSeasons(0); // Initial value; will be updated as seasons are added.

        return SeriesResponse.fromEntity(seriesRepo.save(series));
    }
}
