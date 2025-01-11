
package np.com.bhattaraiankit.video_service.Services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateEpisodeRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.EpisodeResponse;
import np.com.bhattaraiankit.video_service.Models.Episode;
import np.com.bhattaraiankit.video_service.Models.Season;
import np.com.bhattaraiankit.video_service.Models.Video;
import np.com.bhattaraiankit.video_service.Repository.EpisodeRepo;
import np.com.bhattaraiankit.video_service.Repository.SeasonRepo;
import np.com.bhattaraiankit.video_service.Repository.VideoRepo;
import np.com.bhattaraiankit.video_service.Services.EpisodeService;

@Service
public class EpisodeServiceImpl implements EpisodeService {

    private final EpisodeRepo episodeRepo;
    private final SeasonRepo seasonRepo;
    private final VideoRepo videoRepo;

    public EpisodeServiceImpl(EpisodeRepo episodeRepo, SeasonRepo seasonRepo, VideoRepo videoRepo) {
        this.episodeRepo = episodeRepo;
        this.seasonRepo = seasonRepo;
        this.videoRepo = videoRepo;
    }

    @Override
    public EpisodeResponse getEpisodeById(String id) {
        Episode episode = episodeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode not found"));
        return EpisodeResponse.fromEntity(episode);
    }

    @Override
    public List<EpisodeResponse> getEpisodesBySeasonId(String seasonId) {
        return episodeRepo.findBySeasonId(seasonId)
                .stream()
                .map(EpisodeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public EpisodeResponse createEpisode(CreateEpisodeRequest request) {
        Episode episode = new Episode();

        Season season = seasonRepo.findById(request.seasonId())
                .orElseThrow(() -> new RuntimeException("Season not found"));

        Video video = videoRepo.findById(request.videoId())
                .orElseThrow(() -> new RuntimeException("Video not found"));

        episode.setSeason(season);
        episode.setVideo(video);
        episode.setEpisodeNumber(request.episodeNumber());
        episode.setReleasedDate(request.releaseDate());

        return EpisodeResponse.fromEntity(episodeRepo.save(episode));
    }
}
