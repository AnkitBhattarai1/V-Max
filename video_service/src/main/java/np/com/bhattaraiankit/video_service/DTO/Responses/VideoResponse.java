package np.com.bhattaraiankit.video_service.DTO.Responses;

import java.time.LocalDate;

import np.com.bhattaraiankit.video_service.Models.Video.VideoStatus;
import np.com.bhattaraiankit.video_service.Models.Video.VideoType;

public record VideoResponse(
            String id,
            String title, 
            String description, 
            String originalVideoUrl,
            String thumbnailUrl,
            String TrailerUrl,
            LocalDate releaseDate,
            int duration ,
            VideoType videoType,
            String ageRating,
            String language,
            VideoStatus status,
            String metadata
        ) {
}
