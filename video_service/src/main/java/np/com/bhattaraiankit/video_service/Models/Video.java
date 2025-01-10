package np.com.bhattaraiankit.video_service.Models;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.UuidGenerator;
@Entity
@Table(name="video")
public class Video {

public enum VideoType {
    MOVIE, EPISODE, TRAILER, DOCUMENTARY
}

public enum VideoStatus {
    UPLOADED,READY, TRANSCODING, ERROR
}
    @Id
    @UuidGenerator
    private String id;

//    @Column(nullable = false)
    private String title;

    private String description;

//    @Column(nullable = false)
    private String originalVideoUrl;

    private String thumbnailUrl;
    private String trailerUrl;

    private LocalDate releaseDate;

    private int duration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VideoType type;

    private String ageRating;
    private String language;

    @Enumerated(EnumType.STRING)
    private VideoStatus status = VideoStatus.UPLOADED;

    private String metadata;

    // Getters and Setters

    public Video(){

    }
//Setters
    public void setTitle(String title){this.title=title;}
    public void setDescription(String desc){this.description=desc;}
    public void setorginalVideoUrl(String url){this.originalVideoUrl=url;}
    public void setThumbnailUrl(String url){this.thumbnailUrl=url;} 
    public void setTrailerUrl(String url){this.trailerUrl=url;}
    public void setReleaseDate(LocalDate releaseDate){this.releaseDate=releaseDate;}
    public void setDuration(int duration){this.duration=duration;}
    public void setVideoType(VideoType videoType){this.type=videoType;}//representing if it is video of movie,series,or etc.
    public void setAgeRating(String ageRating){this.ageRating=ageRating;}
    public void setLanguage(String language){this.language=language;}
    public void setVideoStatus(VideoStatus status){this.status=status;}
    public void setMetaData(String metadata){this.metadata=metadata;}

    //Getters
    public String getTitle(){return this.title;}
    public String getDescription(){return this.description;}
    public String getId() {
        return id;
    }
    public String getOriginalVideoUrl() {
        return originalVideoUrl;
    }
    public String getThumbnailUrl() {
        return thumbnailUrl;
    }
    public String getTrailerUrl() {
        return trailerUrl;
    }
    public LocalDate getReleaseDate() {
        return releaseDate;
    }
    public int getDuration() {
        return duration;
    }
    public VideoType getType() {
        return type;
    }
    public String getAgeRating() {
        return ageRating;
    }
    public String getLanguage() {
        return language;
    }
    public VideoStatus getStatus() {
        return status;
    }
    public String getMetadata() {
        return metadata;
    }
}

