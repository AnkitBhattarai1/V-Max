package np.com.bhattaraiankit.video_service.Models;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import org.hibernate.annotations.UuidGenerator;

@Entity
public class Season {

    @Id
    @UuidGenerator
    private String id;

    @ManyToOne
    @JoinColumn(name = "series_id", nullable = false)
    private Series series;

    private int seasonNumber;
    private LocalDate releaseDate;

    private String metadata;


    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    private List<Episode> episodes;

    public String getId() {
        return id;
    }

    public Series getSeries() {
        return series;
    }

    public int getSeasonNumber() {
        return seasonNumber;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public String getMetadata() {
        return metadata;
    }


    public List<Episode> getEpisodes() {
        return episodes;
    }


    public void setSeries(Series series) {
        this.series = series;
    }

    public void setSeasonNumber(int seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public void setEpisodes(List<Episode> episodes) {
        this.episodes = episodes;
    }





}
