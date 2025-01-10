package np.com.bhattaraiankit.video_service.Models;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import org.hibernate.annotations.UuidGenerator;

@Entity
public class Episode {

    @Id
    @UuidGenerator
    private String id;

    @ManyToOne
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    private int episodeNumber;
    private LocalDate releaseDate;

    public Episode(){

    }

    public String getId() {return this.id;}
    public Season getSeason(){return this.season;}
    public Video getVideo(){return this.video;}
    public LocalDate getReleasedDate(){return this.releaseDate;}
    public int getEpisodeNumber(){return this.episodeNumber;}

    public void setSeason(Season season){this.season=season;}
    public void setVideo(Video video){this.video=video;}
    public void setReleasedDate(LocalDate date){this.releaseDate=date;}
    public void setEpisodeNumber(int episodeNumber){this.episodeNumber=episodeNumber;}
    
    // Getters and Setters
}
