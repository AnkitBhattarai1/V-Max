package np.com.bhattaraiankit.video_service.DTO.Responses;



import java.time.LocalDate;

import np.com.bhattaraiankit.video_service.Models.Episode;

public record EpisodeResponse(
    String id,
    String seasonId,
    String videoId,
    int episodeNumber,
    LocalDate releaseDate
) {
    public static EpisodeResponse fromEntity(Episode episode) {
        return new EpisodeResponse(
            episode.getId(),
            episode.getSeason().getId(),
            episode.getVideo().getId(),
            episode.getEpisodeNumber(),
            episode.getReleasedDate()
        );
    }
}
