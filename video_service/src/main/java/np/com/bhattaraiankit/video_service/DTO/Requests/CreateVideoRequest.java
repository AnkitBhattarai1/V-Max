package np.com.bhattaraiankit.video_service.DTO.Requests;

import java.time.LocalDate;

import np.com.bhattaraiankit.video_service.Models.Video.VideoType;

public record CreateVideoRequest(
            String title, 
            String description, 
            String originalVideoUrl,
            String thumbnailUrl,
            String trailerUrl,
            LocalDate releaseDate,
            int duration ,
            VideoType videoType,
            String ageRating,
            String language,
            String metadata
        ) {
}
