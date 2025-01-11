

package np.com.bhattaraiankit.video_service.DTO.Requests;

import java.time.LocalDate;
import java.util.List;

public record CreateSeasonRequest(
    
        String seriesId,
    int seasonNumber,
    LocalDate releaseDate,
    String metadata,
    List<String> genres
) {}
