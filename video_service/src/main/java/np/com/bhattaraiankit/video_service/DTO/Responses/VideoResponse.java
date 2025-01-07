package np.com.bhattaraiankit.video_service.DTO.Responses;

import java.time.LocalDate;

import np.com.bhattaraiankit.video_service.Models.Video.VideoType;

public record VideoResponse(
            String id,
            String title, 
            String description, 
            LocalDate releaseDate,
            int duration ,
            VideoType videoType,
            String ageRating,
            String language,
            String metadata
        ) {
}
