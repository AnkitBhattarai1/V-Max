

package np.com.bhattaraiankit.video_service.Services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeasonRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeasonResponse;
import np.com.bhattaraiankit.video_service.Models.Genre;
import np.com.bhattaraiankit.video_service.Models.Season;
import np.com.bhattaraiankit.video_service.Repository.GenreRepo;
import np.com.bhattaraiankit.video_service.Repository.SeasonRepo;
import np.com.bhattaraiankit.video_service.Repository.SeriesRepo;
import np.com.bhattaraiankit.video_service.Services.SeasonService;

@Service
public class SeasonServiceImpl implements SeasonService {

    private final SeasonRepo seasonRepo;
    private final SeriesRepo seriesRepo;
    private final GenreRepo genreRepo;

    public SeasonServiceImpl(SeasonRepo seasonRepo, SeriesRepo seriesRepo, GenreRepo genreRepo) {
        this.seasonRepo = seasonRepo;
        this.seriesRepo = seriesRepo;
        this.genreRepo = genreRepo;
    }

    @Override
    public SeasonResponse getSeasonById(String id) {
        Season season = seasonRepo.findById(id).orElseThrow(() -> new RuntimeException("Season not found"));
        return SeasonResponse.fromEntity(season);
    }

    //later need to find the series and find out the list of season from that */
    @Override
    public List<SeasonResponse> getAllSeasonsBySeriesId(String seriesId) {
        return seasonRepo.findAll()
                .stream()
                .filter(season -> season.getSeries().getId().equals(seriesId))
                .map(SeasonResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public SeasonResponse createSeason(CreateSeasonRequest request) {
        Season season = new Season();
        season.setSeasonNumber(request.seasonNumber());
        season.setReleaseDate(request.releaseDate());
        season.setMetadata(request.metadata());

        // Validate series
        season.setSeries(seriesRepo.findById(request.seriesId())
                .orElseThrow(() -> new RuntimeException("Series not found")));

        // Handle genres
        List<Genre> genres = request.genres()
                .stream()
                .map(name -> genreRepo.findByName(name).orElseGet(() -> genreRepo.save(new Genre(name))))
                .collect(Collectors.toList());

        return SeasonResponse.fromEntity(seasonRepo.save(season));
    }
}
