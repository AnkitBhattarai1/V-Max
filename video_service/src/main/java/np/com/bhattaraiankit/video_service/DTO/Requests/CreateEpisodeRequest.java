package np.com.bhattaraiankit.video_service.DTO.Requests;

import java.time.LocalDate;

public record CreateEpisodeRequest(
    String seasonId,
    String videoId,
    int episodeNumber,
    LocalDate releaseDate
) {}
