

package np.com.bhattaraiankit.video_service.DTO.Responses;

import java.time.LocalDate;

import np.com.bhattaraiankit.video_service.Models.Season;

public record SeasonResponse(
    String id,
    String seriesId,
    int seasonNumber,
    LocalDate releaseDate,
    String metadata
) {
    public static SeasonResponse fromEntity(Season season) {
        return new SeasonResponse(
            season.getId(),
            season.getSeries().getId(),
            season.getSeasonNumber(),
            season.getReleaseDate(),
            season.getMetadata()
        );
    
    }
}
