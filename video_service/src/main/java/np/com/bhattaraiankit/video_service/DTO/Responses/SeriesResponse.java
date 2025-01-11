package np.com.bhattaraiankit.video_service.DTO.Responses;



import java.util.List;
import java.util.stream.Collectors;

import np.com.bhattaraiankit.video_service.Models.Series;

public record SeriesResponse(
    String id,
    String title,
    String description,
    int totalSeasons,
    boolean ongoing,
    String thumbnailUrl,
    String metadata,
    List<String> genres
) {
    public static SeriesResponse fromEntity(Series series) {
        return new SeriesResponse(
            series.getId(),
            series.getTitle(),
            series.getDescription(),
            series.getTotalSeasons(),
            series.isOngoing(),
            series.getThumbnailUrl(),
            series.getMetadata(),
            series.getGenre()
                  .stream()
                  .map(genre -> genre.getName())
                  .collect(Collectors.toList())
        );
    }
}
