package np.com.bhattaraiankit.video_service.DTO.Requests;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.format.annotation.DateTimeFormat;

import np.com.bhattaraiankit.video_service.Models.Video.VideoType;

public record CreateVideoRequest(
            String title, 
            String description, 
            String trailerUrl,
    @DateTimeFormat(pattern = "dd/MM/yyyy") // For form submissions
    @JsonFormat(pattern = "dd/MM/yyyy")  
            LocalDate releaseDate,
            int duration ,
            VideoType videoType,
            String ageRating,
            String language,
            String metadata
        ) {
    }
